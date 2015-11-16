sap.ui.define(function() {
	"use strict";

	var formatter = {

		status: function(sStatus) {
			if (sStatus === "Completed") {
				return "Success";
			} else if (sStatus === "Inprocessing") {
				return "Warning";
			} else if (sStatus === "Cancelled") {
				return "Error";
			} else {
				return "None";
			}
		},
		productCount: function(oValue) {
			//read the number of products returned
			if (oValue) {
				return oValue.length;
			}
		}
	};
	return formatter;

}, /* bExport= */ true);