# assessment

## Commands

* `npm run dev`: Run for development
* `npm test`: Run tests
* `npm build`: Build for deployment
* `npm start`: Run production

## What would I change if moving to production?

* tighen up the types more. 

* While I am happy with the unit tests created, if I had more time I would modify `lib.replaceRefs` to use a trampoline to prevent stack overflow issues.

* If staying with the recursive implementation, I would add additional tests to determine 
how arbitrarily deep the nesting could go before becoming an issue.

* add logging and telemetry (Prometheus).











