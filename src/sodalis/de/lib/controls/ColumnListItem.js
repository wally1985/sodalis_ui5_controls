sap.ui.define([
	"sap/m/ColumnListItem"
], function (Control) {
	"use strict";
	var ColumnListItem = Control.extend("sodalis.de.lib.controls.ColumnListItem", {
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
				},
				selectable: {
					type: "boolean",
					group: "Appearance",
					defaultValue: true
				}
			}
		}
	});

	ColumnListItem.prototype.setSelected = function (bValue) {
		if (this.getSelectable()) {
			Control.prototype.setSelected.apply(this, arguments);
		}
	};

	return ColumnListItem;
});