<template>
  <div class="ct-grid-wrapper" v-bind:class="customCss.wrapperCss">
      <table v-bind:class="customCss.tableCss">
        <thead>
            <tr>
                <th v-for="prop in gridData.props" v-bind:key="prop">
                    {{prop}}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in gridData.rows" v-bind:key="row.id">
                <td v-for="prop in gridData.props" v-bind:key="prop">
                    {{getRowData(row, prop)}}
                </td>
                <td>
                    <button type="button" class="btn btn-outline-danger"
                        @click="row.deleteItem()">
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'CtGrid',
  props: {
    data: [Array, Object],
  },
  computed: {
    gridData: function gridDataFunc() {
      if (this.data != null) {
        return this.initialize(this.data);
      }

      return null;
    },
    customCss: function customCss() {
      const css = {
        wrapperCss: '',
        tableCss: '',
      };

      if (this.data == null) {
        return css;
      }

      css.wrapperCss = (this.gridData && this.gridData.css && this.gridData.css.wrapper) || '';
      css.tableCss = (this.gridData && this.gridData.skipBootstrap) ? '' : 'table table-striped table-bordered';

      return css;
    },
  },
  methods: {
    getRowData: function getRowData(row, propertyName) {
      return row[propertyName];
    },
    initialize: function initialize(data) {
      const gridData = {
        props: [],
        rows: [],
        skipBootstrap: false,
      };

      if (Array.isArray(data)) {
        const firstElem = data[0];
        const firstElemProps = this.getObjectProperties(firstElem);
        gridData.props = firstElemProps;
        gridData.rows = data;
      }

      return gridData;
    },
    getObjectProperties: function getObjectProperties(obj) {
      const propertyNames = Object.getOwnPropertyNames(obj);
      return propertyNames.filter(name => name !== '__ob__' && !this.isFunction(obj[name]));
    },
    isFunction: function isFunction(functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
  },
};
</script>
