sap.ui.define([
	"sap/m/Table"
], function (Control) {
	"use strict";
	return Control.extend("sodalis.de.lib.controls.Table", {
		metadata: {
			properties: {
				deleteActive: {
					type: "boolean",
					group: "Appearance",
					defaultValue: true
				}
			}
		}
	});
});