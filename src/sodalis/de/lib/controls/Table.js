sap.ui.define([
	"sap/m/Table"
], function (Control) {
	"use strict";
	var Table = Control.extend("sodalis.de.lib.controls.Table", {
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

	/*
	 * Internal public function to update the selectAll checkbox
	 * according to the current selection on the list items.
	 *
	 * @protected
	 */
	Table.prototype.updateSelectAllCheckbox = function () {
		Control.prototype.updateSelectAllCheckbox.apply(this, arguments);

		if (this._selectAllCheckBox && this.getMode() === "MultiSelect") {
			// set state of the checkbox by comparing item length and selected item length
			this._selectAllCheckBox.setSelected(this._selectAllCheckBox.getSelected() && this.getSelectedItems().length > 0);
		}
	};

	return Table;
});