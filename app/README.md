React running on : npm start 

http://localhost:3000

Just Submit and get json. I need Nested drag with edit.

Right now in my json each item look like this

{"id":24,"content":"Get Access","heading":1,"elemt":"input","children":[]}


item might have child or blank array like above.

"item.elemt" can have 2 type of values "input" or "div". Depend on "item.elemt" i will create element in div or input in "renderItem" function. When I  creating div element drag-drop working fine. But with input element drag-drop showing some wrong data. state updating properly.




My actually requirement is from server I'm getting items and "item.elemt" is default "div". on DoubleClick on item, this item convert div element to input element. and user will edit the text and save it. on save this input become div. and then user can do drag drop.

 




