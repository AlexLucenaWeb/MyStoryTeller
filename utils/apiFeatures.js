class APIFeatures {
    constructor(query, queryString) {
      // moongose query:
      this.query = query;
      // req.query
      this.queryString = queryString;
    }
  
    // Filtering:
    filter() {
      // Creating an new object with the query params.
      const queryObj = { ...this.queryString };
      // Excluding fields to ignore them in the queryObj
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      //Operators, advanced filtering:
      let queryStr = JSON.stringify(queryObj);
      //replace the operator to be readable for mongodb adding $
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      // Return the obj to keep adding features:
      return this;
    }
  
    // Sorting:
    sort() {
      if (this.queryString.sort) {
        // Dealing witha query with multiple sorts.
        const sortBy = this.queryString.sort.split(',').join(' ');
        // Sorting
        this.query = this.query.sort(sortBy);
      } else {
        // Default sorting
        this.query = this.query.sort('-createdAt');
      }
  
      // Return the obj to keep adding features:
      return this;
    }
  
    // Limiting:
    limitFields() {
      if (this.queryString.fields) {
        // Selecting the fields in the query.
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        // Excluding internal mongoDB fields.
        this.query = this.query.select('-__v');
      }
  
      // Return the obj to keep adding features:
      return this;
    }
  
    //Paginating:
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      // Skiping results to show the page resquested.
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      
      // Return the obj:
      return this;
    }
  }

  module.exports = APIFeatures;