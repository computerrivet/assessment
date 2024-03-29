import { describe, expect, test } from '@jest/globals';
import { replaceRefs } from '../src/lib';

describe('replaceRefs', () => {

    test('null', () => {
        const input = null
        const desired = null;

        const output = replaceRefs(input);

        expect(output).toBe(desired);
    });

    // test primitive String
    test('type string, replace exact match', () => {

        const input = "dog";
        const desired = "cat";

        const output = replaceRefs(input);

        expect(output).toBe(desired);
    });

    test('type string, leave inexact match alone', () => {
        const input = "somethingwithdog";
        const desired = "somethingwithdog";

        const output = replaceRefs(input);
        expect(output).toBe(desired)
    });

    test('type object, replace dog with cat', () => {
        const inputObj = {
            "changeme": "dog"
        };
        const desiredObj = {
            "changeme": "cat"
        };
        const output = replaceRefs(inputObj);
        console.log(output);

        expect(output).toMatchObject(desiredObj);
    });

    test('type array with nested string, replace dog with cat', () => {

        const inputArray = [
            "dog"
        ];
        const desiredArray = [
            "cat"
        ];
        const output = replaceRefs(inputArray);
        console.log(output);

        expect(output).toEqual(desiredArray);
    });

    test('type array with nested string, leave inexact match alone', () => {
        const inputArray = [
            "dogwithsomething"
        ];
        const desiredArray = [
            "dogwithsomething"
        ];
        const output = replaceRefs(inputArray);
        console.log(output);

        expect(output).toEqual(desiredArray);
    });

    test('type object, replace dog with cat', () => {
        const inputObj = {
            "changeme": "dog"
        };
        const desiredObj = {
            "changeme": "cat"
        };

        const output = replaceRefs(inputObj);
        console.log(output);

        expect(output).toMatchObject(desiredObj);
    });

    test('type object, return inexact matches', () => {
        const inputObj = {
            "donotchangeme": "somethingwithdog"
        };
        const desiredObj = {
            "donotchangeme": "somethingwithdog"
        };
        const output = replaceRefs(inputObj);
        expect(output).toMatchObject(desiredObj);
    });

    test('complex array, more nesting', () => {
        const inputObj = [
            {
                "donotchangeme": "somethingwithdog",
                "pi": 3.1416
            },
            {
                "changeme": "dog"
            },
            {
                "nestedarray": [
                    {
                        "changeme": "dog",
                        "pi": 3.1416
                    }
                ],
                "nestedstringarray": ["dog", "somethingwithdog"]
            }
        ];
        const desiredObj = [
            {
                "donotchangeme": "somethingwithdog",
                "pi": 3.1416
            },
            {
                "changeme": "cat"
            },
            {
                "nestedarray": [
                    {
                        "changeme": "cat",
                        "pi": 3.1416
                    }
                ],
                "nestedstringarray": ["cat", "somethingwithdog"]
            }
        ];
        const output = replaceRefs(inputObj);
        expect(output).toMatchObject(desiredObj);
    });
});