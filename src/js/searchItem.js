export const searchItemForValue = (item, searchText) => {
    var found = false;
    Object.getOwnPropertyNames(item).forEach(function (prop) {
        switch (typeof (item[prop])) {
            case "number": {
                if (item[prop].toString() == searchText) {
                    found = true;
                }
                break;
            }
            case "string": {
                if (item[prop].toLowerCase().indexOf(searchText) >= 0) {
                    found = true;
                }
                break;
            }
            case "object": {
                if (!found && item[prop] != null) {
                    found = searchItemForValue(item[prop], searchText);
                }
            }
        }
    });
    return found;
}