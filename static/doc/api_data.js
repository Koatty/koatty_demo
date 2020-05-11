define({ "api": [
  {
    "type": "get",
    "url": "/admin/public/logout",
    "title": "登出",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/PublicController.ts",
    "groupTitle": "Admin",
    "name": "GetAdminPublicLogout"
  },
  {
    "type": "post",
    "url": "/admin/public/login",
    "title": "登录",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，手机号或email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{\"accessToken\": \"\", \"userInfo\": {\"userid\": \"\", \"roleid\": \"\", \"openid\": \"\",\"nickname\":\"\",\"icon\":\"\"},\"pageInfo\": {}}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.userid",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.roleid",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.icon",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageInfo",
            "description": "<p>网页标题、描述等信息</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/PublicController.ts",
    "groupTitle": "Admin",
    "name": "PostAdminPublicLogin"
  },
  {
    "type": "get",
    "url": "/admin/data/index",
    "title": "数据权限列表",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>desc</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "condition",
            "description": "<p>condition</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "create_time",
            "description": "<p>create_time</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "update_time",
            "description": "<p>update_time</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{\"count\":0,\"total\":0,\"page\":0,\"num\":20,\"data\":[]}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>列表数据</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/DataController.ts",
    "groupTitle": "Data",
    "name": "GetAdminDataIndex"
  },
  {
    "type": "get",
    "url": "/admin/data/models",
    "title": "模型名列表",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{modelList: []}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "modelList",
            "description": "<p>模型名列表 {&quot;modelList&quot;:[&quot;&quot;]}</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/DataController.ts",
    "groupTitle": "Data",
    "name": "GetAdminDataModels"
  },
  {
    "type": "get",
    "url": "/admin/data/view",
    "title": "数据权限查看",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>权限ID，可以为多个: 1,2,3.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/DataController.ts",
    "groupTitle": "Data",
    "name": "GetAdminDataView"
  },
  {
    "type": "get",
    "url": "/admin/data/view",
    "title": "数据权限查看",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>权限ID，可以为多个: 1,2,3.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/GroupController.ts",
    "groupTitle": "Data",
    "name": "GetAdminDataView"
  },
  {
    "type": "post",
    "url": "/admin/data/add",
    "title": "数据权限新增",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>数据模型类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>数据规则描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "condition",
            "description": "<p>数据筛选条件</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "modelList",
            "description": "<p>编辑页面显示需要的模型名列表 {&quot;modelList&quot;:[&quot;group&quot;,&quot;role&quot;,&quot;role_data&quot;,&quot;role_rule&quot;,&quot;user&quot;]}</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/DataController.ts",
    "groupTitle": "Data",
    "name": "PostAdminDataAdd"
  },
  {
    "type": "post",
    "url": "/admin/data/del",
    "title": "数据权限删除",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>权限ID，可以为多个: 1,2,3.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/DataController.ts",
    "groupTitle": "Data",
    "name": "PostAdminDataDel"
  },
  {
    "type": "post",
    "url": "/admin/data/edit",
    "title": "数据权限编辑",
    "group": "Data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>规则ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>数据模型类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>数据规则描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "condition",
            "description": "<p>数据筛选条件</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/DataController.ts",
    "groupTitle": "Data",
    "name": "PostAdminDataEdit"
  },
  {
    "type": "get",
    "url": "/admin/data/groups",
    "title": "组织类型列表",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{groupType: []}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "groupType",
            "description": "<p>组织类型列表 {&quot;groupType&quot;:[&quot;&quot;]}</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/GroupController.ts",
    "groupTitle": "Group",
    "name": "GetAdminDataGroups"
  },
  {
    "type": "get",
    "url": "/admin/group/index",
    "title": "组织列表",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>组织名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>组织描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>组织电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>组织邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "attribute",
            "description": "<p>组织标签</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>组织类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "create_time",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "update_time",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{\"count\":1,\"total\":1,\"page\":1,\"num\":20,\"data\":[{\"id\":1,\"name\":\"公司\",\"icon\":\"\",\"desc\":\"公司\",\"address\":\"\",\"phone\":\"\",\"email\":\"\",\"attribute\":\"\",\"type\":0,\"create_time\":1111,\"update_time\":1111,\"status\":1}]}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>列表数据</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/GroupController.ts",
    "groupTitle": "Group",
    "name": "GetAdminGroupIndex"
  },
  {
    "type": "post",
    "url": "/admin/group/add",
    "title": "组织新增",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>组织名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>组织描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>组织类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "icon",
            "description": "<p>组织图标</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>组织地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>组织电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>组织email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "attribute",
            "description": "<p>组织标签</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "groupTypes",
            "description": "<p>新增页面组织类型列表 {&quot;groupTypes&quot;:[{&quot;group_code&quot;:1,&quot;group_name&quot;:&quot;公司&quot;}]}</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/GroupController.ts",
    "groupTitle": "Group",
    "name": "PostAdminGroupAdd"
  },
  {
    "type": "post",
    "url": "/admin/group/del",
    "title": "组织删除",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>组织ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/GroupController.ts",
    "groupTitle": "Group",
    "name": "PostAdminGroupDel"
  },
  {
    "type": "post",
    "url": "/admin/group/edit",
    "title": "组织编辑",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>组织ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>组织名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>组织描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>组织类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "icon",
            "description": "<p>组织图标</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>组织地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>组织电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>组织email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "attribute",
            "description": "<p>组织标签</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "groupTypes",
            "description": "<p>新增页面组织类型列表 {&quot;groupTypes&quot;:[{&quot;group_code&quot;:1,&quot;group_name&quot;:&quot;公司&quot;}]}</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/GroupController.ts",
    "groupTitle": "Group",
    "name": "PostAdminGroupEdit"
  },
  {
    "type": "get",
    "url": "/admin/role/dataList",
    "title": "数据权限列表",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{\"user\":\"\",\"group\":\"\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/RoleController.ts",
    "groupTitle": "Role",
    "name": "GetAdminRoleDatalist"
  },
  {
    "type": "get",
    "url": "/admin/role/index",
    "title": "角色列表",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>角色描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rule_ids",
            "description": "<p>角色功能权限</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data_ids",
            "description": "<p>角色数据权限</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "ext",
            "description": "<p>角色扩展字段</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/RoleController.ts",
    "groupTitle": "Role",
    "name": "GetAdminRoleIndex"
  },
  {
    "type": "get",
    "url": "/admin/role/rule",
    "title": "功能权限列表",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{\"ruleList\":[{\"id\":2,\"desc\":\"权限管理\",\"name\":\"\",\"icon\":\"\",\"level\":2,\"pid\":1,\"children\":[{\"id\":3,\"desc\":\"规则管理\",\"name\":\"\",\"icon\":\"\",\"level\":3,\"pid\":2,\"children\":[],\"goto\":1}]}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/RoleController.ts",
    "groupTitle": "Role",
    "name": "GetAdminRoleRule"
  },
  {
    "type": "post",
    "url": "/admin/role/add",
    "title": "角色新增",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>角色描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ext",
            "description": "<p>扩展信息</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/RoleController.ts",
    "groupTitle": "Role",
    "name": "PostAdminRoleAdd"
  },
  {
    "type": "post",
    "url": "/admin/role/del",
    "title": "角色删除",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>角色ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"成功信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/RoleController.ts",
    "groupTitle": "Role",
    "name": "PostAdminRoleDel"
  },
  {
    "type": "post",
    "url": "/admin/role/edit",
    "title": "角色编辑",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>角色ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>角色描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ext",
            "description": "<p>扩展信息</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "rule_ids",
            "description": "<p>角色功能权限1,2,3</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "data_ids",
            "description": "<p>角色数据权限1,2,3</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"成功信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/RoleController.ts",
    "groupTitle": "Role",
    "name": "PostAdminRoleEdit"
  },
  {
    "type": "get",
    "url": "/admin/user/groupList",
    "title": "用户组列表",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":[{}]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":[{}]}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "GetAdminUserGrouplist"
  },
  {
    "type": "get",
    "url": "/admin/user/index",
    "title": "用户列表",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phonenum",
            "description": "<p>手机号（登录账号）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>用户生日 2018-01-01</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gender",
            "description": "<p>用户性别</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>用户网站</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>用户简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>到期时间 2019-01-01</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleid",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "groupid",
            "description": "<p>组织ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{\"count\":0,\"total\":0,\"page\":0,\"num\":20,\"data\":[]}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>列表数据</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "GetAdminUserIndex"
  },
  {
    "type": "get",
    "url": "/admin/user/roleList",
    "title": "用户角色列表",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":[{}]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":[{}]}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "GetAdminUserRolelist"
  },
  {
    "type": "get",
    "url": "/admin/user/view",
    "title": "用户查看",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>权限ID，可以为多个: 1,2,3.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "GetAdminUserView"
  },
  {
    "type": "post",
    "url": "/admin/user/add",
    "title": "用户新增",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phonenum",
            "description": "<p>手机号（登录账号）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>用户生日 2018-01-01</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gender",
            "description": "<p>用户性别</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>用户网站</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>用户简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>到期时间 2019-01-01</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleid",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "groupid",
            "description": "<p>组织ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "PostAdminUserAdd"
  },
  {
    "type": "post",
    "url": "/admin/user/del",
    "title": "用户删除",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>权限ID，可以为多个: 1,2,3.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"操作成功\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"操作失败\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "PostAdminUserDel"
  },
  {
    "type": "post",
    "url": "/admin/user/edit",
    "title": "用户编辑",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>规则ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>数据模型类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>数据规则描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "condition",
            "description": "<p>数据筛选条件</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\"status\":1,\"code\":200,\"message\":\"\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "{\"status\":0,\"code\":500,\"message\":\"错误信息\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/Admin/UserController.ts",
    "groupTitle": "User",
    "name": "PostAdminUserEdit"
  }
] });
