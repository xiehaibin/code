import * as $protobuf from "protobufjs";
/** Properties of a Student. */
export interface IStudent {

    /** Student name */
    name: string;

    /** Student sex */
    sex: number;

    /** Student count */
    count: number;
}

/** Represents a Student. */
export class Student implements IStudent {

    /**
     * Constructs a new Student.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStudent);

    /** Student name. */
    public name: string;

    /** Student sex. */
    public sex: number;

    /** Student count. */
    public count: number;

    /**
     * Creates a new Student instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Student instance
     */
    public static create(properties?: IStudent): Student;

    /**
     * Encodes the specified Student message. Does not implicitly {@link Student.verify|verify} messages.
     * @param message Student message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStudent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Student message, length delimited. Does not implicitly {@link Student.verify|verify} messages.
     * @param message Student message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStudent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Student message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Student
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Student;

    /**
     * Decodes a Student message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Student
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Student;

    /**
     * Verifies a Student message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Student message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Student
     */
    public static fromObject(object: { [k: string]: any }): Student;

    /**
     * Creates a plain object from a Student message. Also converts values to other types if specified.
     * @param message Student
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Student, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Student to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Student1. */
export interface IStudent1 {

    /** Student1 xhb */
    xhb: string;

    /** Student1 plage */
    plage: number;

    /** Student1 hayden */
    hayden: number;
}

/** Represents a Student1. */
export class Student1 implements IStudent1 {

    /**
     * Constructs a new Student1.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStudent1);

    /** Student1 xhb. */
    public xhb: string;

    /** Student1 plage. */
    public plage: number;

    /** Student1 hayden. */
    public hayden: number;

    /**
     * Creates a new Student1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Student1 instance
     */
    public static create(properties?: IStudent1): Student1;

    /**
     * Encodes the specified Student1 message. Does not implicitly {@link Student1.verify|verify} messages.
     * @param message Student1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStudent1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Student1 message, length delimited. Does not implicitly {@link Student1.verify|verify} messages.
     * @param message Student1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStudent1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Student1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Student1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Student1;

    /**
     * Decodes a Student1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Student1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Student1;

    /**
     * Verifies a Student1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Student1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Student1
     */
    public static fromObject(object: { [k: string]: any }): Student1;

    /**
     * Creates a plain object from a Student1 message. Also converts values to other types if specified.
     * @param message Student1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Student1, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Student1 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
