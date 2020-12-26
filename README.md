# The Wealth & Health of Nations

http://yunus.hacettepe.edu.tr/~zeynepbahcebasi/milletlerinzenginligivesagl%c4%b1k/

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
python -m SimpleHTTPServer
~~~

Or, use the [Observable Runtime](https://github.com/sibersiddet/veri-gorsellestirme-calismam) to
import this module directly into your application. To npm install:



Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@jackli/the-wealth-health-of-nations";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
