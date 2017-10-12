<script>
	function noop() {}
	export default {
		name : 'mo-tab-nav',
		props : {
			panes : Array,
			currentName : String,
			onTabClick: {
        type: Function,
        default: noop
      },
		},
		data () {
			return {}
		},
		render (h) {
			const {
				panes,
				currentName,
				onTabClick
			} = this

			const tabs = this._l(panes, (pane, index) => {
        let tabName = pane.name || pane.index || index
      
        pane.index = `${index}`
        const tabLabelContent = pane.$slots.label || pane.label
        const classes = ['mo-tab-nav']
        if (currentName === tabName) {
        	classes.push('mo-tab-active')
        }
        if (panes.disabled) {
        	classes.push('mo-tab-disabled')
        }
        return h('div', {
        	'class' : classes.join(' '),
        	on : {
        		click (ev) {
        			onTabClick(pane, tabName, ev)
        		} 
        	}
        }, tabLabelContent)
      })

      return h ('div', {
				'class' : 'mo-tabs-navs',
			}, tabs)
		}
	}
</script>