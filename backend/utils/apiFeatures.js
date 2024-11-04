class ApiFeatures {
  constructor(query, qryStr) {
    this.query = query;
    this.qryStr = qryStr;
  }

  search() {
    const keyword = this.qryStr.keyword
      ? {
          name: {
            $regex: this.qryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.qryStr };

    console.log(queryCopy);

    //Removing fields from the query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((key) => delete queryCopy[key]);
    console.log(queryCopy);

    //Advance filter for price, rating etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.qryStr.page) || 1;
    const skip = (currentPage - 1) * resPerPage;
    this.query = this.query.skip(skip).limit(resPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
