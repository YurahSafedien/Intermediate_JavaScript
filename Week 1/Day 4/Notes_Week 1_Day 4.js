/*
========================================================
ArrayBuffer
========================================================
*/

/*
A few JavaScript binary operations are:

- ArrayBuffer
- Unit8Array
- DataView
- Blob
- File

Implemented in a non-standard way, but fairly simple

ArrayBuffer:

– A reference to a fixed-length contiguous memory area.
- It has a fixed length, we can’t increase or decrease it.
- It takes exactly that much space in the memory.
- To access individual bytes, another “view” object is needed, not buffer[index].
- It's a memory area.


*/

//ArrayBuffer Example *Not an array of something.
let buffer = new ArrayBuffer(16); // create a buffer of length 16

alert(buffer.byteLength); // 16

/*
We manipulate ArrayBuffer using 'view'. 'view' doesn't store anything on it's own, just used to interpret bytes stored in ArrayBuffer.

E.g.:

- Uint8Array : treats each byte in ArrayBufferas a separate number, with possible values are from 0 to 255 (a byte is 8-bit, so it can hold only that much). Such value is called a “8-bit unsigned integer”.
- Uint16Array : treats every 2 bytes as an integer, with possible values from 0 to 65535. That’s called a “16-bit unsigned integer”.
- Uint32Array : treats every 4 bytes as an integer, with possible values from 0 to 4294967295. That’s called a “32-bit unsigned integer”.
- Float64Array : treats every 8 bytes as a floating point number with possible values from 5.0x10-324to 1.8x10308.
*/

//View Example

let buffer2 = new ArrayBuffer(16); // create a buffer of length 16

let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

alert(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

alert(view.length); // 4, it stores that many integers

alert(view.byteLength); // 16, the size in bytes

// let's write a value

view[0] = 123456;

// iterate over values

for(let num of view) {

  alert(num); // 123456, then 0, 0, 0 (4 values total)

}

/*
========================================================
TypedArray
========================================================
*/

/*
Common name for the Unit8Array, Unit32Array, etc.

TypedArray constructors (Int8Array, Float64Array, etc.) behaviour depends on argument types.
*/

//5 Variant arguments:

new TypedArray(buffer, [byteOffset], [length]);

new TypedArray(object);

new TypedArray(typedArray);

new TypedArray(length);

new TypedArray();

/*
1. 

If an ArrayBuffer argument is supplied, the view is created over it. We used that syntax already.

Optionally we can provide byteOffset to start from (0 by default) and the length (till the end of the buffer by default), then the view will cover only a part of the buffer.

------------------------------------------
2. 

If an Array, or any array-like object is given, it creates a typed array of the same length and copies the content.

We can use it to pre-fill the array with the data:
*/

let arr2 = new Uint8Array([0, 1, 2, 3]);
alert( arr.length ); // 4, created binary array of the same length
alert( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values

/*
------------------------------------------
3. 

If another TypedArray is supplied, it does the same: creates a typed array of the same length and copies values. Values are converted to the new type in the process, if needed.
*/

let arr_16 = new Uint16Array([1, 1000]);
let arr_8 = new Uint8Array(arr16);
alert( arr8[0] ); // 1
alert( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)

/*
------------------------------------------
4. 

For a numeric argument length – creates the typed array to contain that many elements. Its byte length will be length multiplied by the number of bytes in a single item TypedArray.BYTES_PER_ELEMENT:
*/

let arr = new Uint16Array(4); // create typed array for 4 integers
alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
alert( arr.byteLength ); // 8 (size in bytes)

/*
------------------------------------------
5.

Without arguments, creates an zero-length typed array.

We can create a TypedArray directly, without mentioning ArrayBuffer. But a view cannot exist without an underlying ArrayBuffer, so gets created automatically in all these cases except the first one (when provided).

To access the ArrayBuffer, there are properties:

- arr.buffer : references the ArrayBuffer.
- arr.byteLength : the length of the ArrayBuffer.
------------------------------------------
*/

//Can always move from one view to another:

let arr8 = new Uint8Array([0, 1, 2, 3]);
// another view on the same data
let arr16 = new Uint16Array(arr8.buffer);

/*
Here’s the list of typed arrays:

- Uint8Array, Uint16Array, Uint32Array – for integer numbers of 8, 16 and 32 bits.
- Uint8ClampedArray – for 8-bit integers, “clamps” them on assignment (see below).
- Int8Array, Int16Array, Int32Array – for signed integer numbers (can be negative).
- Float32Array, Float64Array – for signed floating-point numbers of 32 and 64 bits.

No int8 or similar single-valued types
*/

/*
========================================================
Out-of-bounds Behaviour
========================================================
*/

//Demo

let uint8array = new Uint8Array(16);
let num = 256;

alert(num.toString(2)); //100000000 (binary representation)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); //0
alert(uint8array[1]); //1

/*
Uint8ClampedArray - saves 255 for any number that is greater than 255, and 0 for any negative number, useful for image processing.
*/

/*
========================================================
TypedArray Methods
========================================================
*/

/*
TypedArray has regular Array methods, with notable exceptions.

We can iterate, map, slice, find, reduce, etc.

There are a few things we can’t do though:

- No splice : we can’t “delete” a value, because typed arrays are views on a buffer, and these are fixed, contiguous areas of memory. All we can do is to assign a zero.
- No concat method.

There are two additional methods:

- arr.set(fromArr, [offset]) : copies all elements from fromArr to the arr, starting at position offset (0 by default).
- arr.subarray([begin, end]) : creates a new view of the same type from begin to end (exclusive). That’s similar to slice method (that’s also supported), but doesn’t copy anything – just creates a new view, to operate on the given piece of data.

These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.
*/

/*
========================================================
DataView
========================================================
*/

/*
DataView:

- special super-flexible “untyped” view over ArrayBuffer. It allows accessing the data on any offset in any format.

- great when we store mixed-format data in the same buffer. E.g we store a sequence of pairs (16-bit integer, 32-bit float). Then DataView allows to access them easily.

- For typed arrays, the constructor dictates what the format is. The whole array is supposed to be uniform. The i-th number is arr[i].
- With DataView we access the data with methods like .getUint8(i) or .getUint16(i). We choose the format at method call time instead of the construction time.

The syntax:

new DataView(buffer, [byteOffset], [byteLength])

- buffer : the underlying ArrayBuffer. Unlike typed arrays, DataView doesn’t create a buffer on its own. We need to have it ready.
- byteOffset : the starting byte position of the view (by default 0).
- byteLength : the byte length of the view (by default till the end of buffer).
*/

//Sample code:

//binary array of 4 bytes, all have the max value: 255
let buffer3 = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

//get 8-bit number at offset 0
alert(dataView.getUint8(0)); //255

//now get 16-bit number at offset 0, it consists of 2 bytes, together interpreted as 65535
alert(dataView.getUint16(0)); //65535 (biggest 16-bit unsigned int)

//get 32-bit number at offset 0
alert(dataView.getUint32(0)) //2494967295 (biggest 32-bit unsigned int)

dataView.setUint32(0, 0); //set 4-byte number to 0, thus setting all bytes to 0