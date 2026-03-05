export const PROBLEMS = {
    "two-sum": {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Array • Hash Table",
        description: {
            text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
            notes: [
                "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
                "You can return the answer in any order.",
            ],
        },
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
            },
        ],
        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "-10⁹ ≤ nums[i] ≤ 10⁹",
            "-10⁹ ≤ target ≤ 10⁹",
            "Only one valid answer exists",
        ],
        starterCode: {
            javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
            python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
            java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};

int main() {
    Solution sol;
    
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> res1 = sol.twoSum(nums1, 9);
    if(res1.size() > 1) cout << "[" << res1[0] << ", " << res1[1] << "]" << endl; 
    
    vector<int> nums2 = {3, 2, 4};
    vector<int> res2 = sol.twoSum(nums2, 6);
    if(res2.size() > 1) cout << "[" << res2[0] << ", " << res2[1] << "]" << endl; 
    
    vector<int> nums3 = {3, 3};
    vector<int> res3 = sol.twoSum(nums3, 6);
    if(res3.size() > 1) cout << "[" << res3[0] << ", " << res3[1] << "]" << endl; 
    
    return 0;
}`
        },
        expectedOutput: {
            javascript: "[0, 1]\n[1, 2]\n[0, 1]",
            python: "[0, 1]\n[1, 2]\n[0, 1]",
            java: "[0, 1]\n[1, 2]\n[0, 1]",
            cpp: "[0, 1]\n[1, 2]\n[0, 1]",
        },
    },

    "reverse-string": {
        id: "reverse-string",
        title: "Reverse String",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "Write a function that reverses a string. The input string is given as an array of characters s.",
            notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
        },
        examples: [
            {
                input: 's = ["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]',
            },
            {
                input: 's = ["H","a","n","n","a","h"]',
                output: '["h","a","n","n","a","H"]',
            },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
        starterCode: {
            javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1);

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2);`,
            python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)`,
            java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); 
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); 
    }
}`,
            cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your solution here
        
    }
};

void printVector(const vector<char>& v) {
    cout << "[";
    for(size_t i = 0; i < v.size(); ++i) {
        if(i > 0) cout << ", ";
        cout << v[i];
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    
    vector<char> test1 = {'h','e','l','l','o'};
    sol.reverseString(test1);
    printVector(test1);
    
    vector<char> test2 = {'H','a','n','n','a','h'};
    sol.reverseString(test2);
    printVector(test2);
    
    return 0;
}`
        },
        expectedOutput: {
            javascript: "[ 'o', 'l', 'l', 'e', 'h' ]\n[ 'h', 'a', 'n', 'n', 'a', 'H' ]",
            python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
            java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
            cpp: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
        },
    },

    "valid-palindrome": {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
            notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
        },
        examples: [
            {
                input: 's = "A man, a plan, a canal: Panama"',
                output: "true",
            },
            {
                input: 's = "race a car"',
                output: "false",
            },
            {
                input: 's = " "',
                output: "true",
            },
        ],
        constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
        starterCode: {
            javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
            python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
            java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); 
        System.out.println(isPalindrome("race a car")); 
        System.out.println(isPalindrome(" ")); 
    }
}`,
            cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        // Write your solution here
        return false;
    }
};

int main() {
    Solution sol;
    cout << (sol.isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl;
    cout << (sol.isPalindrome("race a car") ? "true" : "false") << endl;
    cout << (sol.isPalindrome(" ") ? "true" : "false") << endl;
    return 0;
}`
        },
        expectedOutput: {
            javascript: "true\nfalse\ntrue",
            python: "True\nFalse\nTrue",
            java: "true\nfalse\ntrue",
            cpp: "true\nfalse\ntrue",
        },
    },

    "maximum-subarray": {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        difficulty: "Medium",
        category: "Array • Dynamic Programming",
        description: {
            text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
            notes: [],
        },
        examples: [
            {
                input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                output: "6",
            },
            {
                input: "nums = [1]",
                output: "1",
            },
            {
                input: "nums = [5,4,-1,7,8]",
                output: "23",
            },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
        starterCode: {
            javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
            python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
            java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); 
        System.out.println(maxSubArray(new int[]{1})); 
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); 
    }
}`,
            cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your solution here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {-2,1,-3,4,-1,2,1,-5,4};
    cout << sol.maxSubArray(nums1) << endl; 
    
    vector<int> nums2 = {1};
    cout << sol.maxSubArray(nums2) << endl; 
    
    vector<int> nums3 = {5,4,-1,7,8};
    cout << sol.maxSubArray(nums3) << endl; 
    
    return 0;
}`
        },
        expectedOutput: {
            javascript: "6\n1\n23",
            python: "6\n1\n23",
            java: "6\n1\n23",
            cpp: "6\n1\n23",
        },
    },

    "container-with-most-water": {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Array • Two Pointers",
        description: {
            text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
            notes: [
                "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
                "Return the maximum amount of water a container can store.",
            ],
        },
        examples: [
            {
                input: "height = [1,8,6,2,5,4,8,3,7]",
                output: "49",
            },
            {
                input: "height = [1,1]",
                output: "1",
            },
        ],
        constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
        starterCode: {
            javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
            python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
            java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); 
        System.out.println(maxArea(new int[]{1,1})); 
    }
}`,
            cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your solution here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> h1 = {1,8,6,2,5,4,8,3,7};
    cout << sol.maxArea(h1) << endl; 
    
    vector<int> h2 = {1,1};
    cout << sol.maxArea(h2) << endl; 
    
    return 0;
}`
        },
        expectedOutput: {
            javascript: "49\n1",
            python: "49\n1",
            java: "49\n1",
            cpp: "49\n1",
        },
    },

    "edit-distance": {
        id: "edit-distance",
        title: "Edit Distance",
        difficulty: "Hard",
        category: "Dynamic Programming • String",
        description: {
            text: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.",
            notes: [
                "You have the following operations permitted:",
                "Insert a character",
                "Delete a character",
                "Replace a character",
            ],
        },
        examples: [
            {
                input: 'word1 = "horse", word2 = "ros"',
                output: "3",
            },
            {
                input: 'word1 = "intention", word2 = "execution"',
                output: "5",
            },
        ],
        constraints: [
            "0 ≤ word1.length, word2.length ≤ 500",
            "word1 and word2 consist of lowercase English letters",
        ],
        starterCode: {
            javascript: `function minDistance(word1, word2) {
  // Write your solution here
}

// Test cases
console.log(minDistance("horse", "ros")); // Expected: 3
console.log(minDistance("intention", "execution")); // Expected: 5`,
            python: `def minDistance(word1, word2):
    pass

print(minDistance("horse", "ros"))  # Expected: 3
print(minDistance("intention", "execution"))  # Expected: 5`,
            java: `class Solution {
    public static int minDistance(String word1, String word2) {
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(minDistance("horse", "ros"));
        System.out.println(minDistance("intention", "execution"));
    }
}`,
            cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        // Write your solution here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.minDistance("horse", "ros") << endl;
    cout << sol.minDistance("intention", "execution") << endl;
    return 0;
}`
        },
        expectedOutput: {
            javascript: "3\n5",
            python: "3\n5",
            java: "3\n5",
            cpp: "3\n5",
        },
    },

    "course-schedule-ii": {
        id: "course-schedule-ii",
        title: "Course Schedule II",
        difficulty: "Hard",
        category: "Graph • Topological Sort",
        description: {
            text: "There are numCourses courses labeled from 0 to numCourses - 1. Return the order you should take to finish all courses.",
            notes: [
                "If there are multiple valid answers, return any of them.",
                "If impossible, return an empty array.",
            ],
        },
        examples: [
            {
                input: "numCourses = 2, prerequisites = [[1,0]]",
                output: "[0,1]",
            },
            {
                input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
                output: "[0,1,2,3]",
            },
        ],
        constraints: [
            "1 ≤ numCourses ≤ 2000",
            "0 ≤ prerequisites.length ≤ 5000",
        ],
        starterCode: {
            javascript: `function findOrder(numCourses, prerequisites) {
  // Write your solution here
  return [];
}

console.log(findOrder(2, [[1,0]]));
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));`,
            python: `def findOrder(numCourses, prerequisites):
    return []

print(findOrder(2, [[1,0]]))
print(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))`,
            java: `import java.util.*;

class Solution {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(findOrder(2, new int[][]{{1,0}})));
        System.out.println(Arrays.toString(findOrder(4, new int[][]{{1,0},{2,0},{3,1},{3,2}})));
    }
}`,
            cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your solution here
        return {};
    }
};

void printVec(vector<int> v) {
    cout << "[";
    for(size_t i=0; i<v.size(); i++) {
        if(i > 0) cout << ", ";
        cout << v[i];
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    
    vector<vector<int>> p1 = {{1,0}};
    printVec(sol.findOrder(2, p1));
    
    vector<vector<int>> p2 = {{1,0},{2,0},{3,1},{3,2}};
    printVec(sol.findOrder(4, p2));
    
    return 0;
}`
        },
        expectedOutput: {
            javascript: "[ 0, 1 ]\n[ 0, 1, 2, 3 ]",
            python: "[0, 1]\n[0, 1, 2, 3]",
            java: "[0, 1]\n[0, 1, 2, 3]",
            cpp: "[0, 1]\n[0, 1, 2, 3]",
        },
    },

    "reverse-k-group": {
        id: "reverse-k-group",
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        category: "Linked List",
        description: {
            text: "Given the head of a linked list, reverse the nodes of the list k at a time.",
            notes: [
                "If the number of nodes is not a multiple of k, leave remaining nodes as is.",
                "You must modify the list in-place.",
            ],
        },
        examples: [
            {
                input: "head = [1,2,3,4,5], k = 2",
                output: "[2,1,4,3,5]",
            },
            {
                input: "head = [1,2,3,4,5], k = 3",
                output: "[3,2,1,4,5]",
            },
        ],
        constraints: [
            "1 ≤ k ≤ list length ≤ 5000",
        ],
        starterCode: {
            javascript: `class ListNode { 
  constructor(val = 0, next = null) { 
    this.val = val; 
    this.next = next; 
  } 
}

function reverseKGroup(head, k) {
  // Write your solution here
  return head;
}

// Helper code to test
function printList(head) {
  let res = [];
  while(head) { res.push(head.val); head = head.next; }
  console.log("[" + res.join(", ") + "]");
}
function createList(arr) {
  let dummy = new ListNode(0), curr = dummy;
  for(let a of arr) { curr.next = new ListNode(a); curr = curr.next; }
  return dummy.next;
}

printList(reverseKGroup(createList([1,2,3,4,5]), 2));
printList(reverseKGroup(createList([1,2,3,4,5]), 3));`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseKGroup(head, k):
    # Write your solution here
    return head

# Helper code to test
def printList(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    print(res)

def createList(arr):
    dummy = ListNode(0)
    curr = dummy
    for a in arr:
        curr.next = ListNode(a)
        curr = curr.next
    return dummy.next

printList(reverseKGroup(createList([1,2,3,4,5]), 2))
printList(reverseKGroup(createList([1,2,3,4,5]), 3))`,
            java: `import java.util.*;

class ListNode { 
    int val; 
    ListNode next; 
    ListNode(int x) { val = x; } 
}

class Solution {
    public static ListNode reverseKGroup(ListNode head, int k) {
        // Write your solution here
        return head;
    }
    
    public static void main(String[] args) {
        printList(reverseKGroup(createList(new int[]{1,2,3,4,5}), 2));
        printList(reverseKGroup(createList(new int[]{1,2,3,4,5}), 3));
    }
    
    // Helpers
    static ListNode createList(int[] arr) {
        ListNode dummy = new ListNode(0), curr = dummy;
        for(int a : arr) { curr.next = new ListNode(a); curr = curr.next; }
        return dummy.next;
    }
    
    static void printList(ListNode head) {
        List<Integer> res = new ArrayList<>();
        while(head != null) { res.add(head.val); head = head.next; }
        System.out.println(res.toString());
    }
}`,
            cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode { 
    int val; 
    ListNode *next; 
    ListNode(int x) : val(x), next(NULL) {} 
};

class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        // Write your solution here
        return head;
    }
};

// Helper code
ListNode* createList(vector<int> arr) {
    ListNode* dummy = new ListNode(0); 
    ListNode* curr = dummy;
    for(int a : arr) { 
        curr->next = new ListNode(a); 
        curr = curr->next; 
    }
    return dummy->next;
}

void printList(ListNode* head) {
    cout << "[";
    bool first = true;
    while(head) {
        if(!first) cout << ", ";
        cout << head->val;
        first = false;
        head = head->next;
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    printList(sol.reverseKGroup(createList({1,2,3,4,5}), 2));
    printList(sol.reverseKGroup(createList({1,2,3,4,5}), 3));
    return 0;
}`
        },
        expectedOutput: {
            javascript: "[2, 1, 4, 3, 5]\n[3, 2, 1, 4, 5]",
            python: "[2, 1, 4, 3, 5]\n[3, 2, 1, 4, 5]",
            java: "[2, 1, 4, 3, 5]\n[3, 2, 1, 4, 5]",
            cpp: "[2, 1, 4, 3, 5]\n[3, 2, 1, 4, 5]",
        },
    },

    "binary-tree-maximum-path-sum": {
        id: "binary-tree-maximum-path-sum",
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        category: "Tree • DFS",
        description: {
            text: "Given the root of a binary tree, return the maximum path sum.",
            notes: [
                "A path can start and end at any node.",
                "The path must contain at least one node.",
            ],
        },
        examples: [
            {
                input: "root = [1,2,3]",
                output: "6",
            },
            {
                input: "root = [-10,9,20,null,null,15,7]",
                output: "42",
            },
        ],
        constraints: [
            "Number of nodes ≤ 3 * 10^4",
            "-1000 ≤ Node.val ≤ 1000",
        ],
        starterCode: {
            javascript: `class TreeNode { 
  constructor(val=0, left=null, right=null) { 
    this.val = val; this.left = left; this.right = right; 
  } 
}

function maxPathSum(root) {
  // Write your solution here
  return 0;
}

// Drivers
let r1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(maxPathSum(r1));

let r2 = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxPathSum(r2));`,
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxPathSum(root):
    # Write your solution here
    return 0

# Drivers
r1 = TreeNode(1, TreeNode(2), TreeNode(3))
print(maxPathSum(r1))

r2 = TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(maxPathSum(r2))`,
            java: `class TreeNode { 
    int val; TreeNode left; TreeNode right; 
    TreeNode(int x) { val = x; } 
    TreeNode(int val, TreeNode left, TreeNode right) { 
        this.val = val; this.left = left; this.right = right; 
    } 
}

class Solution {
    public static int maxPathSum(TreeNode root) {
        // Write your solution here
        return 0;
    }
    
    public static void main(String[] args) {
        TreeNode r1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
        System.out.println(maxPathSum(r1));
        
        TreeNode r2 = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
        System.out.println(maxPathSum(r2));
    }
}`,
            cpp: `#include <iostream>
using namespace std;

struct TreeNode {
    int val; TreeNode *left; TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    int maxPathSum(TreeNode* root) {
        // Write your solution here
        return 0;
    }
};

int main() {
    Solution sol;
    
    TreeNode* r1 = new TreeNode(1); 
    r1->left = new TreeNode(2); r1->right = new TreeNode(3);
    cout << sol.maxPathSum(r1) << endl;
    
    TreeNode* r2 = new TreeNode(-10); 
    r2->left = new TreeNode(9); r2->right = new TreeNode(20);
    r2->right->left = new TreeNode(15); r2->right->right = new TreeNode(7);
    cout << sol.maxPathSum(r2) << endl;
    
    return 0;
}`
        },
        expectedOutput: {
            javascript: "6\n42",
            python: "6\n42",
            java: "6\n42",
            cpp: "6\n42",
        },
    }
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};