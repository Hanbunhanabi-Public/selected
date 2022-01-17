using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraControl : MonoBehaviour
{

    private Transform playerTransform;

    private Vector3 position;
    // Start is called before the first frame update
    void Start()
    {
        playerTransform = GameObject.FindWithTag("Player").transform;
    }

    // Update is called once per frame
    void Update()
    {
        position = transform.position;
        position.x = playerTransform.position.x;
        position.y = playerTransform.position.y;

        transform.rotation = playerTransform.rotation;
        transform.position = position;

    }
}
