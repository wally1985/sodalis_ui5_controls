/*!
 * consodalis GmbH -> mainly me=> WALLY :-)
 */

/**
 * Initialization Code and shared classes of library sodalis.de.controls.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function () {
		"use strict";
		/**
		 * @namespace
		 * @name sodalis.de.controls
		 * @author Walter Zolkin, consodalis GmbH
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "sodalis.de.controls",
			version: "1.0.0",
			dependencies: ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [
				"sodalis.de.controls.Table",
				"sodalis.de.controls.ColumnListItem"
			],
			elements: []
		});

		/* eslint-disable */
		return sodalis.de.controls;
		/* eslint-enable */

	}, /* bExport= */ false);