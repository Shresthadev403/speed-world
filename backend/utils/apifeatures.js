class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.querystr };
    //  console.log(queryCopy);
    // removing fields form querystr
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    
    let querystr = JSON.stringify(queryCopy);
   // console.log(querystr);

  querystr=  querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
  //  console.log(JSON.parse(querystr));
   this.query=this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultPerPage){
const currenPpage=Number(this.querystr.page) ||1;
const skip=resultPerPage*(currenPpage-1);
this.query=this.query.limit(resultPerPage).skip(skip);
return this;
  }
}

module.exports = ApiFeatures;
