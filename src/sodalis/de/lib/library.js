/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library sodalis.de.lib.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function () {
		"use strict";
		/**
		 * 
		 *
		 * @namespace
		 * @name sodalis.de.lib
		 * @author Walter Zolkin (consodalis GmbH)
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "sodalis.de.lib",
			version: "1.0.0",
			dependencies: [
				"sap.ui.core",
				"sap.m"
			],
			types: [],
			interfaces: [],
			controls: [
				"sodalis.de.lib.controls.Example",
				"sodalis.de.lib.controls.BadgeButton"
			],
			elements: []
		});

		/* eslint-disable */
		return sodalis.de.lib;
		/* eslint-enable */

	}, /* bExport= */ false);