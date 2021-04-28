/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

//var $protobuf = require("protobufjs/minimal");
var $protobuf = protobuf

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Student = (function() {

    /**
     * Properties of a Student.
     * @exports IStudent
     * @interface IStudent
     * @property {string} name Student name
     * @property {number} sex Student sex
     * @property {number} count Student count
     */

    /**
     * Constructs a new Student.
     * @exports Student
     * @classdesc Represents a Student.
     * @implements IStudent
     * @constructor
     * @param {IStudent=} [properties] Properties to set
     */
    function Student(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Student name.
     * @member {string} name
     * @memberof Student
     * @instance
     */
    Student.prototype.name = "";

    /**
     * Student sex.
     * @member {number} sex
     * @memberof Student
     * @instance
     */
    Student.prototype.sex = 0;

    /**
     * Student count.
     * @member {number} count
     * @memberof Student
     * @instance
     */
    Student.prototype.count = 0;

    /**
     * Creates a new Student instance using the specified properties.
     * @function create
     * @memberof Student
     * @static
     * @param {IStudent=} [properties] Properties to set
     * @returns {Student} Student instance
     */
    Student.create = function create(properties) {
        return new Student(properties);
    };

    /**
     * Encodes the specified Student message. Does not implicitly {@link Student.verify|verify} messages.
     * @function encode
     * @memberof Student
     * @static
     * @param {IStudent} message Student message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Student.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sex);
        writer.uint32(/* id 3, wireType 5 =*/29).float(message.count);
        return writer;
    };

    /**
     * Encodes the specified Student message, length delimited. Does not implicitly {@link Student.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Student
     * @static
     * @param {IStudent} message Student message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Student.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Student message from the specified reader or buffer.
     * @function decode
     * @memberof Student
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Student} Student
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Student.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Student();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.sex = reader.int32();
                break;
            case 3:
                message.count = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("sex"))
            throw $util.ProtocolError("missing required 'sex'", { instance: message });
        if (!message.hasOwnProperty("count"))
            throw $util.ProtocolError("missing required 'count'", { instance: message });
        return message;
    };

    /**
     * Decodes a Student message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Student
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Student} Student
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Student.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Student message.
     * @function verify
     * @memberof Student
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Student.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (!$util.isInteger(message.sex))
            return "sex: integer expected";
        if (typeof message.count !== "number")
            return "count: number expected";
        return null;
    };

    /**
     * Creates a Student message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Student
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Student} Student
     */
    Student.fromObject = function fromObject(object) {
        if (object instanceof $root.Student)
            return object;
        var message = new $root.Student();
        if (object.name != null)
            message.name = String(object.name);
        if (object.sex != null)
            message.sex = object.sex | 0;
        if (object.count != null)
            message.count = Number(object.count);
        return message;
    };

    /**
     * Creates a plain object from a Student message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Student
     * @static
     * @param {Student} message Student
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Student.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.name = "";
            object.sex = 0;
            object.count = 0;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.sex != null && message.hasOwnProperty("sex"))
            object.sex = message.sex;
        if (message.count != null && message.hasOwnProperty("count"))
            object.count = options.json && !isFinite(message.count) ? String(message.count) : message.count;
        return object;
    };

    /**
     * Converts this Student to JSON.
     * @function toJSON
     * @memberof Student
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Student.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Student;
})();

$root.Student1 = (function() {

    /**
     * Properties of a Student1.
     * @exports IStudent1
     * @interface IStudent1
     * @property {string} xhb Student1 xhb
     * @property {number} plage Student1 plage
     * @property {number} hayden Student1 hayden
     */

    /**
     * Constructs a new Student1.
     * @exports Student1
     * @classdesc Represents a Student1.
     * @implements IStudent1
     * @constructor
     * @param {IStudent1=} [properties] Properties to set
     */
    function Student1(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Student1 xhb.
     * @member {string} xhb
     * @memberof Student1
     * @instance
     */
    Student1.prototype.xhb = "";

    /**
     * Student1 plage.
     * @member {number} plage
     * @memberof Student1
     * @instance
     */
    Student1.prototype.plage = 0;

    /**
     * Student1 hayden.
     * @member {number} hayden
     * @memberof Student1
     * @instance
     */
    Student1.prototype.hayden = 0;

    /**
     * Creates a new Student1 instance using the specified properties.
     * @function create
     * @memberof Student1
     * @static
     * @param {IStudent1=} [properties] Properties to set
     * @returns {Student1} Student1 instance
     */
    Student1.create = function create(properties) {
        return new Student1(properties);
    };

    /**
     * Encodes the specified Student1 message. Does not implicitly {@link Student1.verify|verify} messages.
     * @function encode
     * @memberof Student1
     * @static
     * @param {IStudent1} message Student1 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Student1.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.xhb);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.plage);
        writer.uint32(/* id 3, wireType 5 =*/29).float(message.hayden);
        return writer;
    };

    /**
     * Encodes the specified Student1 message, length delimited. Does not implicitly {@link Student1.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Student1
     * @static
     * @param {IStudent1} message Student1 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Student1.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Student1 message from the specified reader or buffer.
     * @function decode
     * @memberof Student1
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Student1} Student1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Student1.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Student1();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.xhb = reader.string();
                break;
            case 2:
                message.plage = reader.int32();
                break;
            case 3:
                message.hayden = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("xhb"))
            throw $util.ProtocolError("missing required 'xhb'", { instance: message });
        if (!message.hasOwnProperty("plage"))
            throw $util.ProtocolError("missing required 'plage'", { instance: message });
        if (!message.hasOwnProperty("hayden"))
            throw $util.ProtocolError("missing required 'hayden'", { instance: message });
        return message;
    };

    /**
     * Decodes a Student1 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Student1
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Student1} Student1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Student1.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Student1 message.
     * @function verify
     * @memberof Student1
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Student1.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.xhb))
            return "xhb: string expected";
        if (!$util.isInteger(message.plage))
            return "plage: integer expected";
        if (typeof message.hayden !== "number")
            return "hayden: number expected";
        return null;
    };

    /**
     * Creates a Student1 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Student1
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Student1} Student1
     */
    Student1.fromObject = function fromObject(object) {
        if (object instanceof $root.Student1)
            return object;
        var message = new $root.Student1();
        if (object.xhb != null)
            message.xhb = String(object.xhb);
        if (object.plage != null)
            message.plage = object.plage | 0;
        if (object.hayden != null)
            message.hayden = Number(object.hayden);
        return message;
    };

    /**
     * Creates a plain object from a Student1 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Student1
     * @static
     * @param {Student1} message Student1
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Student1.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.xhb = "";
            object.plage = 0;
            object.hayden = 0;
        }
        if (message.xhb != null && message.hasOwnProperty("xhb"))
            object.xhb = message.xhb;
        if (message.plage != null && message.hasOwnProperty("plage"))
            object.plage = message.plage;
        if (message.hayden != null && message.hasOwnProperty("hayden"))
            object.hayden = options.json && !isFinite(message.hayden) ? String(message.hayden) : message.hayden;
        return object;
    };

    /**
     * Converts this Student1 to JSON.
     * @function toJSON
     * @memberof Student1
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Student1.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Student1;
})();

module.exports = $root;
