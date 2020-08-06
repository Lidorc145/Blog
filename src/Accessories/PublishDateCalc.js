
function PublishDateCalc(props) {

    var publishDate = new Date(props.date);
    if (Object.prototype.toString.call(publishDate) === "[object Date]" && !isNaN((publishDate).getTime())) {
        var difdt = new Date(new Date() - publishDate);
        var str = "";
        var before = false;
        if ((difdt.toISOString().slice(0, 4) - 1970) > 0) {
            str += (difdt.toISOString().slice(0, 4) - 1970) + " Years ";
            before = true;
        }

        if ((difdt.toISOString().slice(5, 7)-1) > 0) {
            if (before) {
                str += "and ";
            }
            str += (difdt.toISOString().slice(5, 7)*1-1) + " Month" + ((difdt.toISOString().slice(5, 7)*1-1) > 1 ? "s" : "") + " ";
            before = true;
        }

        if ((Math.floor((difdt.toISOString().slice(8, 10)*1-1)/7)) > 0) {
            if (before) {
                str += "and ";
            }
            str += (Math.floor((difdt.toISOString().slice(8, 10)*1-1)/7)) + " Week" + (Math.floor((difdt.toISOString().slice(8, 10)*1-1)/7) > 1 ? "s" : "") + " ";
            str += ((difdt.toISOString().slice(8, 10)*1-1)%7) + " days";
        }
        if (((difdt.toISOString().slice(8, 10)*1-1)%7) > 0) {
            if (before) {
                str += "and ";
            }
            str += ((difdt.toISOString().slice(8, 10)*1-1)%7) + " days";
        }
        if(str === "")
        {
            return "Today at "+publishDate.getHours()+":"+publishDate.getMinutes();
        }
        return str + " ago";

    }
    return null;
}

export default PublishDateCalc;