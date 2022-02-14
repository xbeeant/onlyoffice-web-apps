/*
 *
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
*/
/**
 * User: Julia.Svinareva
 * Date: 11.02.2022
 */

define([
    'text!common/main/lib/template/SearchPanel.template',
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout'
], function (template) {
    'use strict';

    Common.Views.SearchPanel = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-search',
        template: _.template(template),

        initialize: function(options) {
            _.extend(this, options);
            Common.UI.BaseView.prototype.initialize.call(this, arguments);

            this.isEdit = options.mode.isEdit;
        },

        render: function(el) {
            if (!this.rendered) {
                el = el || this.el;
                $(el).html(this.template({
                    scope: this,
                    headerText: this.isEdit ? this.textFindAndReplace : this.textFind
                }));
                this.$el = $(el);

                this.buttonClose = new Common.UI.Button({
                    parentEl: $('#search-btn-close', this.$el),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-close',
                    hint: this.textCloseSearch
                });
                this.buttonClose.on('click', _.bind(this.onClickClosePanel, this));
            }

            this.rendered = true;
            this.trigger('render:after', this);
            return this;
        },

        show: function () {
            Common.UI.BaseView.prototype.show.call(this,arguments);
            this.fireEvent('show', this );
        },

        hide: function () {
            Common.UI.BaseView.prototype.hide.call(this,arguments);
            this.fireEvent('hide', this );
        },

        ChangeSettings: function(props) {
        },

        onClickClosePanel: function() {
            Common.NotificationCenter.trigger('leftmenu:change', 'hide');
        },

        textFind: 'Find',
        textFindAndReplace: 'Find and replace',
        textCloseSearch: 'Close search'

    }, Common.Views.SearchPanel || {}));
});