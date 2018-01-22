import Vue from 'vue';
import Router from 'vue-router';
import warning from '@/components/warning';
import basic from '@/components/warning/basic';
import paraTypeMaintain from '@/components/warning/basic/paraTypeMaintain';
import paraTypeManage from '@/components/warning/basic/paraTypeManage';
import maintain from '@/components/warning/maintain';
import paraTypeAlert from '@/components/warning/maintain/paraTypeAlert';
import protectTypeAlert from '@/components/warning/maintain/protectTypeAlert';
import signal from '@/components/warning/maintain/configDeviceSignal';
import parameter from '@/components/warning/maintain/configDevicePara';
import analysis from '@/components/warning/analysis';
import test from '@/components/test';
import routerPara from '@/components/routerPara';
import ajaxTest from '@/components/ajaxTest';
import cn from 'vee-validate/dist/locale/zh_CN';
import VeeValidate,{ Validator }  from 'vee-validate';
import Resource from 'vue-resource';

Validator.localize('cn', cn); //中文
Vue.use(VeeValidate);  //引入验证
Vue.use(Router);
Vue.use(Resource);

export default new Router({
  routes: [
    {
      path: '/warning',
      name: 'warning',
      component: warning,
      children: [
        {
          path: '/warning/basic',
          name: 'basic',
          component: basic,
          children: [
            {
              path: '/warning/basic/paraTypeMaintain',
              name: 'paraTypeMaintain',
              component: paraTypeMaintain,
            },
            {
              path: '/warning/basic/paraTypeManage',
              name: 'paraTypeManage',
              component: paraTypeManage,
            }
          ]
        },
        {
          path: '/warning/maintain',
          name: 'maintain',
          component: maintain,
          children:[
            {
              path: '/warning/maintain/paraTypeAlert',
              name: 'paraTypeAlert',
              component: paraTypeAlert,
            },
            {
              path: '/warning/maintain/protectTypeAlert',
              name: 'protectTypeAlert',
              component: protectTypeAlert,
            },
            {
              path: '/warning/maintain/paraTypeAlert/signal',
              name: 'signal',
              component: signal,
            },
            {
              path:'/warning/maintain/paraTypeAlert/parameter',
              name:'parameter',
              component:parameter
            }
          ]
        },
        {
          path: '/warning/analysis',
          name: 'analysis',
          component: analysis
        }
      ]
    },

    {
      path: '/test/:username/post/:post_id',
      name: 'test',
      component: test
    },
    {
      path: '/routerPara',
      name: 'routerPara',
      component: routerPara,
      children: [
        {
          path: '/ajaxTest',
          name: 'ajaxTest',
          component: ajaxTest
        }
      ]
    }
  ]
})
