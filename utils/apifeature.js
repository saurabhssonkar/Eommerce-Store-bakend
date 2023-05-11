const { default: remove } = require("@openzeppelin/cli/lib/scripts/remove");

class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;        
    }
    search(){
        const keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i",
            },
        }
        :{};
        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy={...this.querystr}
      //  console.log(queryCopy);

        // removiing some field

        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key])

        // filter for price and rating 
        //console.log(queryCopy)

        let querystr=JSON.stringify(queryCopy);
        querystr= querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);

        this.query=this.query.find(JSON.parse(querystr));

        //console.log(querystr)

      //  this.query=this.query.find(queryCopy);
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.querystr.page)||1; //50 -10
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    
    }
};

module.exports = ApiFeatures