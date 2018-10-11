# Info

This is the project for subject 990 (UOW).

# Routers

* /display-questions        -- Question list (default)
* /display-questions-result -- Application category suggestion
* /map                      -- Map

# File Tree & Important Files

* /src/app/classes          -- Class definition (Pure data structure)
* /src/app/services         -- Angular services
* /src/app/*                -- Angular component

* /src/app/app-routing.module.ts -- Router
* /src/app/config.ts             -- App-level parameters

# Error Handling

```javascript
import {UOWError} from '/src/app/classes/UOWError';
throw new UOWError('message', 'code', [previous_error]);
```

Detail refer to <http://redmine.didymodesigns.com.au/documents/14>
