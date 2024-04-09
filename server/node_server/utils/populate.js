module.exports = {
    Populate : (field) => function(next){
        this.populate(field);
        next();
    }
}