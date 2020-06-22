/*!
 * ${copyright}
 */

// Provides control sodalis.de.lib.BadgeButton.
sap.ui.define([
	"./../library",
	"sap/m/Button",
	"./BadgeButtonRenderer"
], function (library, Button, BadgeButtonRenderer) {
	"use strict";
	/**
	 * Constructor for a new Example control.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Some class description goes here.
	 * @extends sap.m.Button
	 *
	 * @author Walter Zolkin
	 * @version 1.0.0
	 *
	 * @constructor
	 * @public
	 * @alias sodalis.de.lib.controls.BadgeButton
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var BadgeButton = Button.extend("sodalis.de.lib.controls.BadgeButton", {
		metadata: {
			library: "sodalis.de.lib",
			properties: {
				/**
				 * count shown on top of button
				 */
				count: {
					type: "int",
					group: "Misc",
					defaultValue: null
				}
			}
		},
		renderer: BadgeButtonRenderer
	});
	return BadgeButton;
}, /* bExport= */ true);