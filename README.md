#Encryptscript

A secure, encrypted Javascript format (almost)

##Almost?

Thanks to modern browser inspectors (Chrome Inspector, FireBug, etc.), it is virtually impossible to execute Javascript with `eval()` that will remain hidden from a somewhat competent user.

There are additional factors in place that will hinder the most tenacious inspectors.

##Demo

[Encryptscript](http://kevinselwyn.com/Encryptscript/)

##Usage

Include the script in your document:

```html
<script src="path/to/encryptscript.min.js"></script>
```

(Note: The un-minified, un-uglified, un-compressed version includes a few annoying obfuscations and hindrances, but the minified, uglified, compressed version should hinder even more.)

The script will look for all Encryptscript files included the following way:

```html
<script type="application/encryptscript" src="path/to/hello.es"></script>
```

##Security

On its own, including the script with the syntax above is not enough to execute the Encryptscript.

Because Encryptscript uses AES-128-CBC encryption, a `key` and `iv` (initialization vector) are needed to decrypt properly.

It will look for browser cookies named `key` and `iv` respectively and use their values in the decryption process.

Both cookies' values should be 16-byte hex strings (32 characters). Ex:

```js
document.cookie="key=0102030405060708090a0b0c0d0e0f10";
document.cookie="iv=0102030405060708090a0b0c0d0e0f10";
```

##Options

You can use the `async` attribute on the Encryptscript `<script>` tag to execute asynchronously.

If this attribute is not set, the scripts will queue one after the other.

##Format

The Encryptscript format is just normal Javascript that has been encrypted with AES-128-CBC and converted to Base64.

You can generate them with OpenSSL:

```bash
KEY=0102030405060708090a0b0c0d0e0f10
IV=0102030405060708090a0b0c0d0e0f10

cat input.js | openssl enc -aes-128-cbc -K ${KEY} -iv ${IV} | openssl enc -base64 -A -out output.es
```

Encrytscript files must be served up with the correct MIME type. Add the type in your .htaccess:

```
AddType application/encryptscript es
```

If longer loading times are not an issue, you can create Encryptscript files on the fly with PHP.

Make sure that you set the content type:

```php
header("Content-Type: application/encryptscript");
```

Then you can use `openssl_encrypt()` to encrypt your Javascript.

(Note: There is no need to Base64 encode the result of `openssl_encrypt()` because it outputs in Base64 by default)

##Dependencies

Encryptscript depends on [JES](https://github.com/kevinselwyn/JES) for AES decryption.

##Support

*	IE8+
*	Chrome
*	Firefox
*	Safari
*	Opera

##Is this really secure?

No, silly. Don't use this in production.