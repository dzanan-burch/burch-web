module.exports = function () {
    return {
        generateId: function() {
            var length = 8;
            var id = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (i = 0; i < length; i++) {
                id = id + possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return id;
        }
    };
};