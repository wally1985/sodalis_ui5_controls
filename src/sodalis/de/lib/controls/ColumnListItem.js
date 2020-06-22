sap.ui.define([
	"sap/m/ColumnListItem"
], function (Control) {
	"use strict";
	return Control.extend("sodalis.de.lib.controls.ColumnListItem", {
		metadata: {
			properties: {
				editable: {
					type: "boolean",
					group: "Appearance",
					defaultValue: true
				},
				deleteable: {
					type: "boolean",
					group: "Appearance",
					defaultValue: true
				}
			}
		}
	});
});