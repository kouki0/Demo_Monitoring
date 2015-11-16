sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	"./fragment/utilities"

], function(jQuery, Controller, Filter, JSONModel, utilities) {
	"use strict";
	return sap.ui.controller("monitoring.view.ItemDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BL_Monitoring0.view.ItemDetail
		 */
		onInit: function() {
			var view = this.getView();
			this._oView = this.getView();
			this._oAssignDialog = null;
			this._oUnassignDialog = null;
			this._oLsdDialog = null;
			this.getRouter().attachRouteMatched(function(oEvent) {
				var sContextPath = new sap.ui.model.Context(view.getModel(), "/" +
					oEvent.getParameter("arguments").item);
				view.setBindingContext(sContextPath);
			}, this);
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		// Assign Button
		onAssignButtonPressed: function(oEvent) {
			if (!this._oAssignDialog) {
				this._oAssignDialog = this._createDialog("monitoring.view.fragment.AssignDialog");
				this._oView.addDependent(this._oAssignDialog);
			}
			this._oAssignDialog.open();

		},

		onAssignConfirmAction: function(oEvent) {
			this._oAssignDialog.close();
		},

		onAssignCancelAction: function(oEvent) {
			this._oAssignDialog.close();

		},

		// Unassign Button
		onUnassignButtonPressed: function(oEvent) {
			if (!this._oUnassignDialog) {
				this._oUnassignDialog = this._createDialog("monitoring.view.fragment.UnassignDialog");
				this._oView.addDependent(this._oUnassignDialog);
			}
			this._oUnassignDialog.open();
		},

		onUnassignConfirmAction: function(oEvent) {
			this._oUnassignDialog.close();
		},

		onUnassignCancelAction: function(oEvent) {
			this._oUnassignDialog.close();
		},

		//LSD Button
		onLsdButtonPressed: function(oEvent) {
			if (!this._oLsdDialog) {
				this._oLsdDialog = this._createDialog("monitoring.view.fragment.LSDDialog");
				this._oView.addDependent(this._oLsdDialog);
			}
			this._oLsdDialog.open();
		},

		onLsdConfirmAction: function(oEvent) {

			var today = new Date();
			var dateFrom = sap.ui.getCore().byId("sdate").mProperties.value.split("-");

			var fyear = dateFrom[0];
			var fmonth = dateFrom[1] - 1;
			var fday = dateFrom[2];

			var cdate = today.getDate();
			var cmonth = today.getMonth();
			var cyear = today.getFullYear();

			var fdate = new Date(fyear, fmonth, fday);
			cdate = new Date(cyear, cmonth, cdate);

			if (fdate >= cdate) {
				alert("date entered correctly");
			} else {
				alert(" Incorrect Date");
			}
		},

		onLsdCancelAction: function(oEvent) {
			this._oLsdDialog.close();
		},

		//Create Dialog
		_createDialog: function(sDialog) {
			var oDialog = sap.ui.xmlfragment(sDialog, this);
			utilities.attachControl(this._oView, oDialog);
			return oDialog;
		},

		onNavBack: function() {
			this.getRouter().myNavBack("detail");
		}

	});
});