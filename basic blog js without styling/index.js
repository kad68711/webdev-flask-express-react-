import { doesNotThrow } from "assert";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var blogitems = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { blogitems: blogitems });
});

app.post("/submitpost", (req, res) => {

  blogitems.push({
    blogname: req.body.postname,
    blogcontent: req.body.postcontent,
  });
  res.redirect("/")
  
});
app.get("/:blogname",(req,res)=>{
   
    
    res.render("post.ejs",{blogitem:JSON.parse(req.query.blog)})
})
app.post("/edit", (req, res) => {
    
    var blog=JSON.parse(req.body.blog)
    console.log(blogitems)
    console.log(blog)
    blogitems.forEach((item)=>{
        
        console.log("fffffffff")
        if (item.blogname==blog.blogname){
           
            item.blogcontent=req.body.postcontent;
            var blogitem=item;
            console.log("/"+blog.blogname+"?blog="+encodeURIComponent(JSON.stringify(blogitem)))
            res.redirect("/"+blog.blogname+"?blog="+encodeURIComponent(JSON.stringify(blogitem)))
        }
    })
    
    

  //add new post here
});


app.listen(3000, () => {
  console.log("server running on 3000");
});

// what constituits an http request and response
// params and query a tag examples
// how this can only be used once /:blogname
// params and qurey form example.
// is their way of sending data in header also

// how param and query are inside the header difference in params and query and how params appear in the url and query 
// differne in request body and header and the need to have both 

// encodeURIComponent(JSON.stringify(blogitems[i])
// JSON.parse(req.query.blog)

{/* <input type="hidden" name="blog" value="<%= JSON.stringify(blogitem) %>"></input>
console.log(req.body.blog) */}