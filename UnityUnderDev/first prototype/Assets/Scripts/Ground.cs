using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ground : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    Vector3 getNormal()
    {
        return  transform.rotation * Quaternion.Euler(0, 0, 90) *  new Vector3(1, 0f, 0f) ;
    }
}
