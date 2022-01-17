import {mat4, vec3, vec4} from 'gl-matrix';
import canvas from './Canvas';

class CircleManager {
  canvas_width = 0;
  canvas_height = 0;
  canvas_half_width = 0;
  canvas_half_height = 0;
  current_test_index = 0;
  current_test_map = {};
  test_result = [];
  selection_ring = null;
  start_circle = null;

  test_sets = [];
  unique_circle_size_set = [];
  // database = {
  //   width: [
  //     {min: 0, max: 0.25},
  //     {min: 0.25, max: 0.5},
  //     {min: 0.5, max: 0.75},
  //     {min: 0.75, max: 1},
  //   ],
  //   height: [
  //     {min: 0, max: 0.25},
  //     {min: 0.25, max: 0.5},
  //     {min: 0.5, max: 0.75},
  //     {min: 0.75, max: 1},
  //   ],
  //   size: [20, 50, 80],
  // };

  database = {
    width: [
      // {min: 0, max: 0.25},
      // {min: 0.25, max: 0.5},
      // {min: 0.5, max: 0.75},
      // {min: 0.75, max: 1},
      {min: 0, max: 0.5},
      {min: 0.5, max: 1},
    ],
    height: [
      // {min: 0, max: 0.25},
      // {min: 0.25, max: 0.5},
      // {min: 0.5, max: 0.75},
      // {min: 0.75, max: 1},
      {min: 0, max: 0.34},
      {min: 0.34, max: 0.67},
      {min: 0.57, max: 1},
    ],
    size: [20, 50, 80],
  };

  // database = {
  //   width: [{min: 0.25, max: 0.5}],
  //   height: [{min: 0.5, max: 0.75}],
  //   size: [50],
  // };

  initialize(new_width, new_height) {
    this.canvas_width = new_width;
    this.canvas_height = new_height;
    this.canvas_half_width = new_width / 2;
    this.canvas_half_height = new_height / 2;
    this.start_circle = this.set_start_circle(
      this.canvas_half_width,
      this.canvas_half_height,
      40,
    );
  }

  generate_test_sets(repeat_times) {
    for (let i = 0; i < this.database.width.length; i++) {
      for (let j = 0; j < this.database.height.length; j++) {
        for (let k = 0; k < this.database.size.length; k++) {
          for (let l = 0; l < repeat_times; l++) {
            this.test_sets.push({
              width: this.database.width[i],
              height: this.database.height[j],
              size: this.database.size[k],
            });
          }
        }
      }
    }
    this.test_sets.sort(() => Math.random() - 0.5);

    for (let k = 0; k < this.database.size.length; k++) {
      this.unique_circle_size_set.push({
        width: null,
        height: null,
        size: this.database.size[k],
      });
    }

    // console.log('tests:', this.test_sets);
    // console.log('unique', this.unique_circle_size_set);
  }

  createCircle(pos, angle, scale, color) {
    const newCircle = this.createInternalCircle(pos, angle, scale, color);

    canvas.renderList.push(
      // canvas.createShape(
      //   'circle', //shape type name, must match with defined name
      //   vec3.fromValues(pos[0], pos[1], -5), //shape center should be vec3
      //   0, //shape angle
      //   vec3.fromValues(scale[0], scale[1], scale[2]), //shape scale should be vec3
      //   color, //shape color r, g, b, a with range in 0 - 1
      //   true,
      // ),
      // this.createInternalCircle(pos, angle, scale, color),
      newCircle,
    );
    // console.log('create circle', canvas.renderList[0]);
  }

  createInternalCircle(pos, angle, scale, color) {
    return canvas.createShape(
      'circle', //shape type name, must match with defined name
      vec3.fromValues(pos[0], pos[1], -5), //shape center should be vec3
      0, //shape angle
      vec3.fromValues(scale[0], scale[1], scale[2]), //shape scale should be vec3
      color, //shape color r, g, b, a with range in 0 - 1
      true,
    );
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  is_circle_overlap(target_circle, x, y, radius) {
    // console.log('overlap: ', target_circle, 'x: ', x, 'y: ', y, 'r: ', radius);
    return (
      this.distance(target_circle.pos[0], target_circle.pos[1], x, y) <
      radius + target_circle.scale[0]
    );
  }

  get_random_pos(min, max) {
    return Math.random() * (max - min) + min;
  }

  circle_bound_check(x, y, radius) {
    if (
      x + radius > this.canvas_half_width ||
      x - radius < -this.canvas_half_width ||
      y + radius > this.canvas_half_height ||
      y - radius < -this.canvas_half_height
    ) {
      // console.log('circle out of bound', x, y, radius);
      return false;
    }

    for (let i = 0; i < canvas.renderList.length; i++) {
      if (
        canvas.renderList[i].shapeType === 'circle' &&
        canvas.renderList[i].is_normal &&
        this.is_circle_overlap(canvas.renderList[i], x, y, radius)
      ) {
        return false;
      }
    }
    return true;
  }

  calculate_effective_bound(radius) {
    return {
      width: this.canvas_half_width - radius,
      height: this.canvas_half_height - radius,
    };
  }

  pick_circle_position(bound) {
    return {
      pos_x: this.get_random_pos(-bound.width, bound.width),
      pos_y: this.get_random_pos(-bound.height, bound.height),
    };
    // }
  }

  random_pick_circle_position(single_circle_config, bound) {
    const pos_x = this.get_random_pos(
      Math.max(
        (single_circle_config.width.min - 0.5) * this.canvas_width,
        -bound.width,
      ),
      Math.min(
        (single_circle_config.width.max - 0.5) * this.canvas_width,
        bound.width,
      ),
    );
    // console.log('bound x', bound.width, pos_x);
    // console.log('bound y', bound.height, pos_y);

    const pos_y = this.get_random_pos(
      Math.max(
        (single_circle_config.height.min - 0.5) * this.canvas_height,
        -bound.height,
      ),
      Math.min(
        (single_circle_config.height.max - 0.5) * this.canvas_height,
        bound.height,
      ),
    );
    // console.log('bound x', bound.width, pos_x);
    // console.log('bound y', bound.height, pos_y);
    return {pos_x: pos_x, pos_y: pos_y};
  }

  propose_circle(single_circle_config, is_core, bound) {
    const proposed_pos = is_core
      ? this.random_pick_circle_position(single_circle_config, bound)
      : this.pick_circle_position(bound);
    if (
      this.circle_bound_check(
        proposed_pos.pos_x,
        proposed_pos.pos_y,
        single_circle_config.size,
      )
    ) {
      this.createCircle(
        [proposed_pos.pos_x, proposed_pos.pos_y, 0],
        0,
        [single_circle_config.size, single_circle_config.size, 1],
        is_core ? [1, 0, 0, 1] : [0.4, 0.4, 0.4, 1],
      );
      // console.log('propose circle', proposed_pos);
      // console.log('bound', bound);

      //if this is a core element add it to the result list
      if (is_core) {
        this.test_result.push({
          x: proposed_pos.pos_x,
          y: proposed_pos.pos_y,
          size: single_circle_config.size,
        });
      }
      return true;
    }
    return false;
  }

  bound_test(single_circle_config) {
    //check bound if too big them direct abort
    const bound = this.calculate_effective_bound(single_circle_config.size);
    //too big guard
    if (
      bound.width < single_circle_config.size ||
      bound.height < single_circle_config.size
    ) {
      return {bound: bound, result: false};
    }
    return {bound: bound, result: true};
  }

  generate_circle_frame(
    single_circle_config,
    max_non_target_circles,
    max_try_steps,
  ) {
    const bound_test_result = this.bound_test(single_circle_config);
    if (!bound_test_result.result) {
      console.log('bound test fail');
      return false;
    }

    //generate the core
    for (let i = 0; i < max_try_steps; i++) {
      if (
        this.propose_circle(single_circle_config, true, bound_test_result.bound)
      ) {
        break;
      }
    }
    //now propose a random circle sets
    this.current_test_map[canvas.renderList[canvas.renderList.length - 1].uid] =
      canvas.renderList.length - 1;

    for (let i = 0; i < max_non_target_circles; i++) {
      let circle_index = -1;
      let current_bound_test_result = null;
      //find a possible size circle
      for (let k = 0; k < max_try_steps; k++) {
        const _circle_index = Math.floor(
          this.get_random_pos(0, this.unique_circle_size_set.length),
        );

        current_bound_test_result = this.bound_test(
          this.unique_circle_size_set[_circle_index],
        );
        if (current_bound_test_result.result) {
          circle_index = _circle_index;
          break;
        }
      }
      // console.log('__bound', bound_test_result, circle_index);
      //not found solution break the second loop
      if (circle_index === -1) {
        break;
      }

      for (let j = 0; j < max_try_steps; j++) {
        // if find a possible point for this circle
        if (
          this.propose_circle(
            this.unique_circle_size_set[circle_index],
            false,
            current_bound_test_result.bound,
          )
        ) {
          this.current_test_map[
            canvas.renderList[canvas.renderList.length - 1].uid
          ] = canvas.renderList.length - 1;
          break;
        }
      }
    }
  }

  set_selection_ring(x, y, radius) {
    this.selection_ring = this.createInternalCircle(
      [x, y, 0],
      0,
      [radius, radius, 1],
      [1, 0.5, 1, 1],
    );
  }

  set_start_circle(width, height, radius) {
    return this.createInternalCircle(
      [width / 2, -height / 2, 0],
      0,
      [radius, radius, 1],
      [0, 1, 0, 1],
    );
  }

  test_start_circle(x, y) {
    return (
      this.distance(this.start_circle.pos[0], this.start_circle.pos[1], x, y) <
      this.start_circle.scale[0]
    );
  }

  update_selection_ring(radius) {
    this.selection_ring.scale = vec3.fromValues(radius, radius, 1);
    this.selection_ring.mtx = canvas.calculateTransForm(
      this.selection_ring.pos,
      this.selection_ring.angle,
      this.selection_ring.scale,
    );
  }

  remove_selection_ring() {
    this.selection_ring = null;
  }

  new_start() {
    this.test_result = [];
    this.test_sets = [];
    this.unique_circle_size_set = [];
    this.current_test_index = 0;
    this.selection_ring = null;
    this.generate_test_sets(10);
  }

  has_next_frame() {
    return this.current_test_index < this.test_sets.length;
  }

  set_up_circle_frame() {
    //reset the canvas
    canvas.renderList = [];
    canvas.shapeIDAssign = 0;
    this.selection_ring = null;
    this.current_test_map = {};
    console.log('set up new frame');
    if (this.current_test_index >= this.test_sets.length) {
      console.warn('reach end');
      return false;
    }

    const single_circle_config = this.test_sets[this.current_test_index++];
    // console.log(single_circle_config);
    // console.warn('test index ', this.c urrent_test_index);
    this.generate_circle_frame(single_circle_config, 15, 10);
    // console.log('generate render list', canvas.renderList);
    return true;
  }

  record_result(result) {
    if (this.test_result.length > 0 && this.current_test_index > 0) {
      this.test_result[this.current_test_index - 1].result = result;
    }
  }

  in_canvas(x, y) {
    return (
      x > -this.canvas_half_width &&
      x < this.canvas_half_width &&
      y > -this.canvas_half_height &&
      y < this.canvas_half_height
    );
  }

  search_render_list(id) {
    // for (let i = 0; i < canvas.renderList.length; i++) {
    //   if (canvas.renderList[i].uid === id) {
    //     return i;
    //   }
    // }
    // return -1;
    if (!this.current_test_map.hasOwnProperty(id)) {
      return -1;
    } else {
      return this.current_test_map[id];
    }
  }

  search_circles(target_pos, radius) {
    const result_index = [];
    const unique = {};
    for (let i = 0; i < 360; i++) {
      let pos = canvas.polarToCartesian(radius, i);
      pos[0] += target_pos[0];
      pos[1] += target_pos[1];
      // console.log('search circle');
      if (this.in_canvas(pos[0], pos[1])) {
        const test_result = canvas.singleSelectTest(pos[0], pos[1]);
        if (test_result >= 0 && !unique.hasOwnProperty(test_result)) {
          // console.log('find circle at', pos[0], pos[1]);
          unique[test_result] = 1;
          const current_index = this.search_render_list(test_result);
          if (current_index !== -1) {
            result_index.push(current_index);
          }
        }
      }
    }
    return result_index;
  }

  update_circles(previous_active_list, current_active_list) {
    console.log(previous_active_list);
    for (let i = 0; i < previous_active_list.length; i++) {
      canvas.renderList[previous_active_list[i]].counter_color = [
        0.4,
        0.6,
        1,
        1,
      ];
    }
    // console.log('update circle ', current_active_list);
    for (let i = 0; i < current_active_list.length; i++) {
      canvas.renderList[current_active_list[i]].counter_color = [
        1,
        0.8,
        0.0,
        1,
      ];
    }
  }
}
const circleManager = new CircleManager();
export default circleManager;
