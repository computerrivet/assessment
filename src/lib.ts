
export function replaceRefsRecur(input: any, searchTerm: any, replaceTerm: any): any {

    // case 1: array
    if (Array.isArray(input)) {
        // iterate through the array,
        const newArray = [];

        for (let obj of input) {
            newArray.push(replaceRefsRecur(obj, searchTerm, replaceTerm));
        }

        return newArray;
    }

    // case 2: object
    if (input instanceof Object) {
        const newObj = {} as any;

        // recurse
        for (let key of Object.keys(input)) {
            newObj[key] = replaceRefsRecur(input[key], searchTerm, replaceTerm);
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

class Stack {
    a: Array<any> = [];

    len(): number {
        return this.a.length;
    }

    push(value: any, parent: any = null, key?: number | string) {
        let type = Array.isArray(value) ? 'array' : typeof value;
        this.a.push({ value, type, parent, key });
    }

    pop(): any {
        return this.a.pop();
    }

    // peek(): any {
    //     if (this.a.length === 0) return null;
    //     return this.a[this.a.length - 1]
    // }

    // dump() {
    //     this.a.forEach((value, idx) => {
    //         console.log(value);
    //     });
    // }
}

export function replaceRefsIter(input: any, searchTerm: string, replaceTerm: any): any {

    if (!input) return input;

    const stack = new Stack();
    stack.push(input);

    while (stack.len() > 0) {
        let current = stack.pop();

        switch (current.type) {
            case 'array':
                for (let i = 0; i < current.value.length; i++) {
                    stack.push(current.value[i], current.value, i);
                }
                break;
            case 'object':
                const keys = Object.keys(current.value);
                for (let i = 0; i < keys.length; i++) {
                    stack.push(current.value[keys[i]], current.value, keys[i]);
                }
                break;
            case 'string':
                if (current.value === searchTerm) {

                    // if .parent is null, then this is a primitive 
                    // type and just return it
                    if (current.parent == null) {
                        return replaceTerm;
                    }

                    // if .parent is not null, then mutate the parent
                    current.parent[current.key] = replaceTerm;
                }
                break;
        }
    }

    return input;
}