# assessment

What would I change if moving to production?

* I would tighen up the types more. 

* I am happy with the unit tests created, but if I had more time I would probably 
modify `lib.replaceRefs` to use a trampoline to prevent stack overflow issues.
If staying with the recursive implementation, I would add additional tests to determine 
how arbitrarily deep the nesting could go before becoming an issue.

* I would add logging and probably telemetry (Prometheus or OpenTelemetry).

* I would ensure the error handling is more robust.











