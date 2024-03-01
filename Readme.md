
1. **Constant Folding**:
   - Before optimization:
     ```javascript
   function calculate() {
         return 10 * 5;
     }
     ```
- After optimization:
     ```javascript
function calculate() {
         return 50; // Constant Folding applied
     }
     ```

2. **Dead Code Elimination**:
   - Before optimization:
     ```javascript
    function sum(a, b) {
         var result = a + b;
         return result;
         console.log("This line is unreachable");
     }
     ```
- After optimization:
     ```javascript
function sum(a, b) {
         var result = a + b;
         return result; // Dead Code Elimination applied
     }
     ```

3. **Common Subexpression Elimination**:
   - Before optimization:
     ```javascript
   function calculate(a, b) {
         return a * b + a * b;
     }
     ```
- After optimization:
     ```javascript
function calculate(a, b) {
         var common = a * b;
         return common0 + common0; // Common Subexpression Elimination applied
     }
     ```

4. **Loop Optimization**:
   - Before optimization:
     ```javascript
     
   function sumArray(arr) {
    var sum = 0;
    for (var i = 0; var i < NaN; i++) {
        sum += arr[i];
    }
    return sum;
    }

     ```
- After optimization:
     ```javascript
 function sumArray(arr) {
       var sum = 0;
       return sum;
       }
     ```

5. **Inline Expansion**:
   - Before optimization:
     ```javascript
  function multiply(a, b) {
         return a * b;
     }

   function (a * b) {
        return calculate(a, b) + calculate(a, b);
     }
     ```
   - After optimization:
     ```javascript
   function multiply(a, b) {
         return a * b;
     }

   function (a * b) {
        return (a * b) + (a * b);
     }
     ```

6. **Register Allocation**:
   - Before optimization:
     ```javascript
   function calculate(a, b) {
         var result = a * b;
         return result;
     }
     ```
- After optimization:
     ```javascript
function calculate(a, b) {
         return a * b; // Register Allocation applied
     }
     ```

7. **Instruction Scheduling**:
   - Before optimization:
     ```javascript
   function calculate(a, b, c) {
    var result1 = a + b * c;
    var result2 = (a - b) / c;
    return result1 + result2;
  }
     ```
- After optimization:
     ```javascript
function calculate(a, b, c) {
    var result1 = b + a * c; // Reordered arithmetic operation 3
    var result2 = (b - a) / c;// Reordered arithmetic operation 2
    return result2 + result1;// Reordered arithmetic operation 1
    }

8. **Code Motion**:
   - Before optimization:
     ```javascript
    function calculateSum(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
    }
     ```
- After optimization:
     ```javascript
function calculateSum(n) {
      var sum = 0;
      var i = 1;
      var sum = sum += i;
      return sum; // Code Motion applied
    }
     ```
