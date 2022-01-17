using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Numerics;
using System.Security.Cryptography;
using Unity.Mathematics;
using UnityEditor.Experimental.GraphView;
using UnityEngine;
using UnityEngine.Serialization;
using Quaternion = UnityEngine.Quaternion;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;

public class player : MonoBehaviour
{
    public float moveSpeed = 10f;
    public float detachSpeed = 10f;
     
    public float rotationAcceleration = 10f;
    public float floatingHorizontalAcceleration = 0.05f;
    public float floatingVerticalAcceleration = 0.05f;

    public float rotationAccelerationDelta = 1;
    public float floatingHorizontalAccelerationDelta = 0.2f;
    public float floatingVerticalAccelerationDelta = 0.2f;

    public float landingTranslateDelta = 0.05f;

    public float groundTestDelta = 0.1f;

    public int maxThrusterCapacity = 100;

    private float currentThrusterCapacity;
    
    // private float movementX;
    // private float movementY;

    private const string IS_GROUNED = "isGrounded";
    private const string FLOATING_STATE = "floatingState";
    private const string IS_WALK = "isWalk";
    private const string GROUND_TAG = "ground";

    private bool isGrounded = false;
    private bool isInitialized = false;
    private bool debugDraw = false;
    private Vector3 debugStart1 = new Vector3(0,0,0);
    private Vector3 debugStart2 = new Vector3(0,0,0);
    private Vector3 debugDirection1 = new Vector3(0,0,0);
    private Vector3 debugDirection2 = new Vector3(0,0,0);
   
    private Rigidbody2D rigidbody2D;
    private SpriteRenderer spriteRenderer;
    private Animator animator;

    [SerializeField] private BoxCollider2D body;
    [SerializeField] private BoxCollider2D foot;
    [SerializeField] private LayerMask platformLayermask;
    
    
    enum FloatingStage{
        FLOATING_IDLE,
        FLOATING_FORWARD,
        FLOATING_ROTATION_LEFT,
        FLOATING_ROTATION_RIGHT,
        FLOATING_UP,
        FLOATING_DOWN

    }

    enum GroundFace
    {
        UP, DOWN, LEFT, RIGHT
    }
    
    private void Awake()
    {
        rigidbody2D = GetComponent<Rigidbody2D>();
        spriteRenderer = GetComponent<SpriteRenderer>();
        animator = GetComponent<Animator>();

        currentThrusterCapacity = maxThrusterCapacity;
    }
    
    // Start is called before the first frame update
    void Start()
    {
       
    }

    private void FixedUpdate()
    {
        float movementX = Input.GetAxisRaw("Horizontal");
        float movementY = Input.GetAxisRaw("Vertical");
        
        if (!isInitialized)
        {
            // rigidbody2D.AddForce(new Vector2(0f, -10), ForceMode2D.Impulse);
            isInitialized = true;
            Debug.Log("initialized");
        }

        handleFloatingHorizontalMovement(movementX);
        handleVertialMovement(movementY);
        handeJump();
        // isGrounded = isGroundedTest();
        // if (!isGrounded)
        //     Debug.Log("not ground");
        // else
        //     Debug.Log("ground");

        
        if (debugDraw)
        {
            Debug.DrawRay(debugStart1, debugDirection1, Color.red);
            Debug.DrawRay(debugStart2, debugDirection2, Color.yellow);
        }
    }

    // Update is called once per frame
    void Update()
    {
        handleMovement();


    }

    private void handleMovement()
    {
        float movementX = Input.GetAxisRaw("Horizontal");
        float movementY = Input.GetAxisRaw("Vertical");

        handleRotation();
        
        if (movementX > 0)
        {

            spriteRenderer.flipX = false;
        }
        else if (movementX < 0)
        {
            spriteRenderer.flipX = true;

        }
        else
        {

        }

        handleGroundHorizontalMovement( movementX);


        if (movementX == 0 && movementY == 0)
        {
            if (isGrounded)
            {
                animator.SetBool(IS_WALK, false);
            }
            else
            {
                animator.SetInteger(FLOATING_STATE, (int)FloatingStage.FLOATING_IDLE);
            }
        }
        
        
        
        //TODO check isGrounded

        
        
    }

    private void handleGroundHorizontalMovement(float movementX)
    {
        if (isGrounded && movementX!=0 )
            {
                if (isGroundedTest())
                {
                    animator.SetBool(IS_WALK, true);
                    transform.position +=   transform.rotation*  new Vector3(movementX, 0f, 0f) * moveSpeed * Time.deltaTime ;
                }
                else
                {
                    animator.SetBool(IS_GROUNED, false);
                    animator.SetBool(IS_WALK,false);
                    animator.SetInteger(FLOATING_STATE,(int)FloatingStage.FLOATING_FORWARD);
                    Vector3 direction = transform.rotation*  new Vector3(movementX, 0f, 0f) * floatingHorizontalAcceleration ;
                    rigidbody2D.AddForce(new Vector2(direction.x,direction.y), ForceMode2D.Impulse);
                    currentThrusterCapacity-= Time.deltaTime;
                    isGrounded = false;
                }

            }



        
    }

    private void handleFloatingHorizontalMovement(float movementX)
    {
        if (!isGrounded && movementX!=0 && currentThrusterCapacity>0 )
        {
            animator.SetInteger(FLOATING_STATE, (int) FloatingStage.FLOATING_FORWARD);
            Vector3 direction = transform.rotation*  new Vector3(movementX, 0f, 0f) * floatingHorizontalAcceleration ;
            rigidbody2D.AddForce(new Vector2(direction.x,direction.y), ForceMode2D.Impulse);
            currentThrusterCapacity-= Time.deltaTime;
            Debug.Log("Horizontal Thruster: "+ currentThrusterCapacity);
        }
    }

    private void handleVertialMovement(float movementY)
    {
        if (!isGrounded && movementY!=0 && currentThrusterCapacity>0)
        {
            
            if (movementY>0) animator.SetInteger(FLOATING_STATE, (int) FloatingStage.FLOATING_UP);
            else if (movementY<0) animator.SetInteger(FLOATING_STATE, (int) FloatingStage.FLOATING_DOWN);
            Vector3 direction = transform.rotation*  new Vector3(0, movementY, 0f) * floatingVerticalAcceleration ;
            rigidbody2D.AddForce(new Vector2(direction.x,direction.y), ForceMode2D.Impulse);
            currentThrusterCapacity-= Time.deltaTime;
            Debug.Log("Vertial Thruster: "+ currentThrusterCapacity);    
        }

    }

    private void handleRotation()
    {
        float roll = Input.GetAxisRaw("Rotate");
        if (!isGrounded && roll != 0 && currentThrusterCapacity>0)
        {
            
            if (roll>0)
            {
                
                // transform.Rotate(0,0,rotationAcceleration*Time.deltaTime);
                rigidbody2D.angularVelocity += rotationAcceleration;
            }
            else if (roll < 0)
            {
                // transform.Rotate(0,0,-rotationAcceleration*Time.deltaTime);
                rigidbody2D.angularVelocity += -rotationAcceleration;
            }

            currentThrusterCapacity-=Time.deltaTime;
            Debug.Log("Rotation Thruster: "+ currentThrusterCapacity);
        }
    }

    private void handeJump()
    {
        if (Input.GetButton("Jump") && isGrounded)
        {
            this.isGrounded = false;
            animator.SetBool(IS_GROUNED,isGrounded);
            // rigidbody2D.AddForce(new Vector2(0f, detachSpeed), ForceMode2D.Impulse);
            Vector3 direction = transform.rotation* Quaternion.Euler(0,0,90) * new Vector3(1, 0f, 0f) * detachSpeed ;
            rigidbody2D.AddForce(new Vector2(direction.x,direction.y), ForceMode2D.Impulse);
        }
    }

    private void OnCollisionEnter2D(Collision2D col)
    {
        
        if (col.gameObject.CompareTag(GROUND_TAG) && col.otherCollider == foot && !isGrounded )
        {
            GroundFace groundFace = resolveGroundHitDirection(col);
            Debug.Log("Landed on face:" + (int)groundFace);
            isGrounded = true;
            currentThrusterCapacity = maxThrusterCapacity;
            animator.SetInteger(FLOATING_STATE, (int)FloatingStage.FLOATING_IDLE);
            animator.SetBool(IS_GROUNED, isGrounded);
            animator.SetBool(IS_WALK, false);
            
            rigidbody2D.velocity = new Vector2(0,0);
            rigidbody2D.angularVelocity = 0;

            GameObject collidedGameObject = col.gameObject;
            float thisObjectNormal = (transform.eulerAngles.z+90)%360;
            
            float collidedAngle = (collidedGameObject.transform.eulerAngles.z+90) %360;
            
            float adjustedAngle = collidedAngle - thisObjectNormal;
            if (adjustedAngle > 90 || adjustedAngle < -90)
                adjustedAngle -= 180;
            transform.Rotate(0,0,adjustedAngle);
            
            Vector3 down = transform.rotation * Quaternion.Euler(0, 0, -90) * new Vector3(1, 0, 0);
            // RaycastHit2D result = Physics2D.BoxCast(foot.bounds.center, foot.size, transform.eulerAngles.z,
            //     new Vector2(down.x, down.y).normalized, foot.size.y / 2 + groundTestDelta, platformLayermask);
            RaycastHit2D  result = Physics2D.Raycast(transform.position, new Vector2(down.x, down.y).normalized,
                (body.size.y + foot.size.y)/2  + 1.0f,platformLayermask);
            float desireDistance = (body.size.y + foot.size.y)/2 +
                                   col.gameObject.GetComponents<BoxCollider2D>()[(int) groundFace].size.y / 2 - landingTranslateDelta;

            
            if (result.distance > desireDistance)
            {
                Vector3 offset = transform.rotation * Quaternion.Euler(0, 0, -90) * new Vector3(result.distance- desireDistance, 0, 0);
                transform.Translate(offset);
                Debug.Log("handle extra space");
                debugDraw = true;
                debugStart1 = this.transform.position;
                debugDirection1 = offset;
            }

            Debug.Log("thisObjectNormal: "+thisObjectNormal + " collidedAngle: "+ collidedAngle+ " adjusted angle: "+ adjustedAngle);
            
        }
        debugDraw = true;

        }
    
    




    private GroundFace resolveGroundHitDirection(Collision2D collision)
    {
        return (GroundFace) Array.IndexOf(collision.gameObject.GetComponents<BoxCollider2D>(), collision.collider);
    }
    
    Vector3 getNormal(GameObject targetGameObject)
    {
        return  targetGameObject.transform.rotation * Quaternion.Euler(0, 0, 90) *  new Vector3(1, 0f, 0f) ;
    }
    
    static float AngleOffAroundAxis(Vector3 v, Vector3 forward, Vector3 axis){
        v = v.normalized;
        Vector3 right = Vector3.Cross(axis, forward).normalized;
        forward = Vector3.Cross(right, axis).normalized;
        return Mathf.Atan2(Vector3.Dot(v, right), Vector3.Dot(v, forward)) * Mathf.Rad2Deg;
    }

    bool isGroundedTest()
    {
        Vector3 down = transform.rotation * Quaternion.Euler(0, 0, -90) * new Vector3(1, 0, 0);
        // Debug.DrawRay(foot.bounds.center, down);
        
        
        // RaycastHit2D  result = Physics2D.Raycast(foot.bounds.center, new Vector2(down.x, down.y).normalized,
        //     foot.size.y/2 + groundTestDelta, platformLayermask);

        RaycastHit2D result = Physics2D.BoxCast(foot.bounds.center, foot.size, transform.eulerAngles.z,
            new Vector2(down.x, down.y).normalized, foot.size.y / 2 + groundTestDelta, platformLayermask);
        
        Debug.Log("is grounded: "+  (result.collider!=null)+" " + foot.bounds.center+ "y:" + foot.size.y/2 +" size: "+foot.size);
        
        
        
        Debug.DrawRay(foot.bounds.center, new Vector2(down.x, down.y).normalized * (foot.size.y / 2 + groundTestDelta),
            result.collider != null ? Color.green : Color.red);
        return result;
        
    }

    void handleLanding(RaycastHit2D landing)
    {
        
    }
    
}
