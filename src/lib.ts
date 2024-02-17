
export function replaceRefs(input: any): any {

    // case 1: array
    if (Array.isArray(input)) {
        // iterate through the array,
        const newArray = [];

        for (let obj of input) {
            newArray.push(replaceRefs(obj));
        }

        return newArray;
    }

    // case 2: object
    if (input instanceof Object) {
        const newObj = {} as any;

        // recurse
        for (let key of Object.keys(input)) {
            newObj[key] = replaceRefs(input[key]);
        }

        return newObj;
    }


    // case 3: replace string and return
    if (typeof input === 'string') {
        if (input === 'dog') {
            return 'cat'
        } else {
            return input;
        }
    }

    // case 4: just return other types.
    return input;
}