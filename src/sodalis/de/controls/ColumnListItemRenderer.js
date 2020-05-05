sap.ui.define([
	"sap/m/ColumnListItemRenderer",
	"sap/m/ListType",
	"sap/ui/core/IconPool"
], function (ControlRenderer, ListType, IconPool) {
	"use strict";
	return ControlRenderer.extend("sodalis.de.controls.ColumnListItemRenderer", {

		renderContentLatter: function (rm, oLI) {
			var sMode = oLI.getMode(),
				sIconURI;

			this.renderCounter(rm, oLI);

			if (oLI.getType() === ListType.Detail || oLI.getType() === ListType.DetailAndActive) {
				if (oLI.getEditable()) {
					sIconURI = IconPool.getIconURI("edit");
				} else {
					sIconURI = IconPool.getIconURI("display");
				}

				if (sIconURI !== oLI.DetailIconURI && oLI._oDetailControl) {
					oLI.DetailIconURI = sIconURI;
					oLI._oDetailControl.destroy();
					oLI._oDetailControl = undefined;
				}
			}

			this.renderType(rm, oLI);
			this.renderMode(rm, oLI, 1);

			if (this.isModeMatched(sMode, 1)) {
				// no dublicate renderings
				return;
			}

			if (oLI.getDeleteable() && oLI.getListProperty("deleteActive")) {
				let oModeControl = oLI.getDeleteControl(true);
				if (oModeControl) {
					this.renderModeContent(rm, oLI, oModeControl);
				}
			}
		}

	});
});