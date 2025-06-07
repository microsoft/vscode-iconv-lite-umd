/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 *  REQUIREMENT: This definition is dependent on the @types/node definition.
 *  Install with `npm install @types/node --save-dev`
 *--------------------------------------------------------------------------------------------*/

declare module "@vscode/iconv-lite-umd" {
  // Basic API
  export function decode(
    buffer: Uint8Array,
    encoding: Encoding,
    options?: Options
  ): string;

  export function encode(
    content: string,
    encoding: Encoding,
    options?: Options
  ): Uint8Array;

  export function encodingExists(encoding: Encoding): boolean;

  // Stream API
  // WARNING: Excluded because it is specific to node.
  // export function decodeStream(encoding: Encoding, options?: Options): NodeJS.ReadWriteStream;

  // export function encodeStream(encoding: Encoding, options?: Options): NodeJS.ReadWriteStream;

  // Low-level stream APIs
  export function getEncoder(
    encoding: Encoding,
    options?: Options
  ): EncoderStream;

  export function getDecoder(
    encoding: Encoding,
    options?: Options
  ): DecoderStream;
}

export interface Options {
  stripBOM?: boolean;
  addBOM?: boolean;
  defaultEncoding?: Encoding;
}

export interface EncoderStream {
  write(str: string): Uint8Array;
  end(): Uint8Array | undefined;
}

export interface DecoderStream {
  write(buf: Uint8Array): string;
  end(): string | undefined;
}

type Encoding =
  | "utf8"
  | "utf8bom"
  | "utf16le"
  | "utf16be"
  | "windows1252"
  | "iso88591"
  | "iso88593"
  | "iso885915"
  | "macroman"
  | "cp437"
  | "windows1256"
  | "iso88596"
  | "windows1257"
  | "iso88594"
  | "iso885914"
  | "windows1250"
  | "iso88592"
  | "cp852"
  | "windows1251"
  | "cp866"
  | "cp1125"
  | "iso88595"
  | "koi8r"
  | "koi8u"
  | "iso885913"
  | "windows1253"
  | "iso88597"
  | "windows1255"
  | "iso88598"
  | "iso885910"
  | "iso885916"
  | "windows1254"
  | "iso88599"
  | "windows1258"
  | "gbk"
  | "gb18030"
  | "cp950"
  | "big5hkscs"
  | "shiftjis"
  | "eucjp"
  | "euckr"
  | "windows874"
  | "iso885911"
  | "koi8ru"
  | "koi8t"
  | "gb2312"
  | "cp865"
  | "cp850";
