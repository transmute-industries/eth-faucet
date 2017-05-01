pragma solidity ^0.4.8;

library QueueUtils
{
    Queue requests;

    event ElementPopped(uint256 _element);
    event ElementPushed(uint256 _element, uint256 _index);

    function queue() {
        requests.data.length = 200;
    }

    struct Queue {
        uint256[] data;
        uint256 front;
        uint256 back;
    }
    /// @dev the number of elements stored in the queue.
    function length(Queue storage q) constant internal returns (uint256) {
        return q.back - q.front;
    }
    /// @dev the number of elements this queue can hold
    function capacity(Queue storage q) constant internal returns (uint256) {
        return q.data.length - 1;
    }

    function isOverlapped(Queue storage q) internal returns (bool) {
        return (q.back + 1) % q.data.length == q.front;
    }

    /// @dev push a new element to the back of the queue
    function push(Queue storage q, uint256 data) internal {
        if (isOverlapped(q)) throw;
        q.data[q.back] = data;

        ElementPushed(data, q.back);

        q.back = (q.back + 1) % q.data.length;
    }


    /// @dev remove and return the element at the front of the queue
    function pop(Queue storage q) internal returns (uint256 r)
    {
        if (q.back == q.front)
            return; // throw;
        r = q.data[q.front];
        delete q.data[q.front];
        q.front = (q.front + 1) % q.data.length;
        return r;
    }


    function addRequest(uint256 d) {
        push(requests, d);
    }

    function popRequest() {
        ElementPopped(pop(requests));
    }

    function queueLength() constant returns (uint256) {
        return length(requests);
    }
}
