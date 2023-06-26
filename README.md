# Example of unclear behaviour/bug in json schemas

To install, please run the following (or use your preferred package manager).

```sh
npm i
```

To run, please run the following.

```sh
node example.js
```


## Explanation of the problem

You will have to POST endpoints, `/broken` and `/working`. The only difference is the schema that is used for request bodies; they use `broken_schema.js` and `working_schema.js`, respectively.

The schemas expect some information about a defintion. The definition has a type that can be either `modelAsObject` or `modelAsString`. If the type is `modelAsObject`, the `model` property is expected to be an object with two properties, `name` and `version`. If the type is `modelAsString`, the `model` property is expected to be a string and a third property is expected, called `version`.

There seems to be a mix-up in fastify with the `model` property. If that property is renamed to `xmodel` in `modelAsString`, everything works.


## Re-create the problem

Please send the following four bodies with a tool of your choice (e.g. Postman) to POST <http://127.0.0.1:3000> after starting the server.

---

Send this to POST <http://127.0.0.1:3000/working>. Should be working.

```json
{
    "definition": {
        "type": "modelAsObject",
        "model": {
            "name": "addition",
            "version": "bla"
        }
    }
}
```

---

Send this to POST <http://127.0.0.1:3000/working>. Should be working. Note, that one property is called `xmodel`!

```json
{
    "definition": {
        "type": "modelAsString",
        "xmodel": "something",
        "version": "bla"
    }
}
```

---

Send this to POST <http://127.0.0.1:3000/broken>. Should be working.

```json
{
    "definition": {
        "type": "modelAsObject",
        "model": {
            "name": "addition",
            "version": "bla"
        }
    }
}
```

---

Send this to POST <http://127.0.0.1:3000/broken>. Here, you should get an error. Note, that one property is called `model`!

```json
{
    "definition": {
        "type": "modelAsString",
        "model": "something",
        "version": "bla"
    }
}
```

The error looks like

```json
{
    "statusCode": 400,
    "code": "FST_ERR_VALIDATION",
    "error": "Bad Request",
    "message": "body/definition/type must be equal to constant, body/definition must have required property 'version', body/definition must match exactly one schema in oneOf, body/definition must match exactly one schema in oneOf"
}
```
