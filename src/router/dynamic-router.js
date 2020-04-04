import withHolding from '@/views/with-holding/withHolding'
import certify from '@/views/certify/certify'
import graduateCertify from '@/views/certify/graduation-certify/graduationCertify'
import CEgrade from '@/views/certify/CEgrade/CEgrade'
import status from '@/views/certify/status/status'
import graduate from '@/views/graduate/graduate'
import frontApply from '@/views/graduate/front-apply/frontApply'
import frontCheck from '@/views/graduate/front-check/frontCheck'
import graduateApply from '@/views/graduate/graduate-apply/graduateApply'
import graduateApplyList from '@/views/graduate/graduate-apply-list/graduateApplyList'
import graduateApplyApproval from '@/views/graduate/graduate-apply-approval/graduateApplyApproval'
import graduatePrint from '@/views/graduate/graduate-print/graduatePrint'
import graduateDistribute from '@/views/graduate/graduate-distribute/graduateDistribute'
import graduateConfirm from '@/views/graduate/graduate-confirm/graduateConfirm'
import graduateSearch from '@/views/graduate/graduate-search/graduateSearch'
import graduateRepeal from '@/views/graduate/graduate-repeal/graduateRepeal'
import limitSet from '@/views/graduate/limit-set/limitSet'
import report from '@/views/report/report'
import graduateReport from '@/views/report/graduate-report/graduateReport'
import thesisReport from '@/views/report/thesis-report/thesisReport'
import postRegister from '@/views/certify/post-register/postRegister'

const dynamicRoutes = [
  {
    path: '/withHolding',
    component: withHolding,
    name: 'withHolding',
    meta: {
      roles: ['区考试', '省考试', '市考试', '用户'],
      icon: 'el-icon-tickets',
      name: '预提管理'
    }
  },
  {
    path: '/certify',
    component: certify,
    name: 'certify',
    meta: {
      roles: ['区考试', '省考试', '市考试', '用户'],
      name: '证明管理',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'graduateCertify',
        name: 'graduate-certify',
        component: graduateCertify,
        meta: {
          roles: ['区考试', '省考试', '市考试'],
          name: '毕业证明'
        }
      },
      {
        path: 'CEgrade',
        name: 'CEgrade',
        component: CEgrade,
        meta: {
          roles: ['区考试', '省考试', '市考试'],
          name: '成绩证明'
        }
      },
      {
        path: 'status',
        name: 'status',
        component: status,
        meta: {
          roles: ['区考试', '省考试', '市考试', '用户'],
          name: '考籍表打印'
        }
      },
      {
        path: 'register',
        name: 'register',
        component: postRegister,
        meta: {
          roles: ['区考试', '省考试', '市考试'],
          name: '研究生报考证明'
        }
      }
    ]
  },
  {
    path: '/graduate',
    component: graduate,
    name: 'graduate',
    meta: {
      roles: ['区考试', '省考试', '市考试', '用户'],
      name: '毕业管理',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'frontApply',
        component: frontApply,
        name: 'frontApply',
        meta: {
          roles: ['用户'],
          name: '前置学历申请'
        }
      },
      {
        path: 'frontCheck',
        component: frontCheck,
        name: 'frontCheck',
        meta: {
          roles: ['区考试', '省考试', '市考试'],
          name: '前置学历审批'
        }
      },
      {
        path: 'graduateApply',
        component: graduateApply,
        name: 'graduateApply',
        meta: {
          roles: ['用户'],
          name: '毕业申请'
        }
      },
      {
        path: 'graduateApplyList',
        component: graduateApplyList,
        name: 'graduateApplyList',
        meta: {
          roles: ['用户'],
          name: '查看你的毕业申请'
        }
      },
      {
        path: 'graduateApplyApproval',
        component: graduateApplyApproval,
        name: 'graduateApplyApproval',
        meta: {
          roles: ['区考试', '省考试', '市考试'],
          name: '审核毕业申请'
        }
      },
      {
        path: 'graduatePrint',
        component: graduatePrint,
        name: 'graduatePrint',
        meta: {
          roles: ['省考试'],
          name: '毕业证打印'
        }
      },
      {
        path: 'graduateDistribute',
        component: graduateDistribute,
        name: 'graduateDistribute',
        meta: {
          roles: ['区考试'],
          name: '毕业证派发设置'
        }
      },
      {
        path: 'graduateConfirm',
        component: graduateConfirm,
        name: 'graduateConfirm',
        meta: {
          roles: ['区考试'],
          name: '毕业证派发确认'
        }
      },
      {
        path: 'graduateSearch',
        component: graduateSearch,
        name: 'graduateSearch',
        meta: {
          roles: ['用户'],
          name: '毕业证查找'
        }
      },
      {
        path: 'graduateRepeal',
        component: graduateRepeal,
        name: 'graduateRepeal',
        meta: {
          roles: ['省考试'],
          name: '毕业证撤销'
        }
      },
      {
        path: 'limitSet',
        component: limitSet,
        name: 'limitSet',
        meta: {
          roles: ['省考试'],
          name: '业务时间表设置'
        }
      }
    ]
  },
  {
    path: '/report',
    component: report,
    name: 'report',
    meta: {
      roles: ['省考试'],
      name: '报表管理',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'graduateReport',
        component: graduateReport,
        name: 'graduateReport',
        meta: {
          roles: ['省考试'],
          name: '毕业生统计'
        }
      },
      {
        path: 'thesisReport',
        component: thesisReport,
        name: 'thesisReport',
        meta: {
          roles: ['省考试'],
          name: '论文统计'
        }
      }
    ]
  }
]

export default dynamicRoutes
