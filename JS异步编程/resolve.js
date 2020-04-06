import { isObject, isFunction } from "util"
//! promise 解析过程
function resolve(promise, x) {
    if (x === promise) {
        return reject(promise, new TypeError('cant be the same'))
    }
    if (isPromise(x)) {
        if (x.state === 'pending') {
            return x.then(() => {
                resolve(promise, x.value)
            }, () => {
                reject(promise, x.value)
            })
        }
        if (x.state === 'fulfilled') {
            return fulfill(promise, x.value)
        }
        if (x.state === 'rejected') {
            return reject(promise, x.value)
        }
    } else if (isObject(x) || isFunction(x)) {
        let then;
        try {
            then = x.then
        } catch (e) {
            return reject(promise, e)
        }
        if (isFunction(then)) {
            let isCalled = false;
            try {
                then.call(x, function resolvePromise(y) {
                    if (isCalled) {
                        return 
                    }
                    isCalled = true
                    resolve(promise, y)
                }, function rejectPromise(r) {
                    if (isCalled) {
                        return
                    }
                    isCalled = true
                    reject(promise, y)
                })
            } catch (e) {
                if (!isCalled) {
                    reject(promise, e)
                }
            }
        } else {
            return fulfill(promise, x)
        }
    
    } else {
        return fulfill(promise, x)
    }
}


const arr = [1, 2, 3]

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110" :inline="true">
      <Form-item label="账户名称" prop="accountName">
        <Input v-model="formValidate.accountName" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="所属券商" prop="brokerName">
        <Input v-model="formValidate.brokerName" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="账户类型" prop="accountType">
        <Input v-model="formValidate.accountType" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="资金号" prop="accountNumber">
        <Input v-model="formValidate.accountNumber" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="服务器ip" prop="serverIp">
        <Input v-model="formValidate.serverIp" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="服务器端口" prop="serverPort">
        <Input v-model="formValidate.serverPort" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="服务器mac地址" prop="serverMac">
        <Input v-model="formValidate.serverMac" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="文件单路径" prop="docPath">
        <Input v-model="formValidate.docPath" placeholder="请输入账户名称" class="edit-form-item-long" />
      </Form-item>
      <Form-item label="佣金费率" prop="netCommission">
        <InputNumber v-model="formValidate.netCommission" class="edit-form-item-long" :step="0.0001" ></InputNumber>
      </Form-item>
      <Form-item label="账户资金" prop="actualAmount">
        <InputNumber v-model="formValidate.actualAmount" :min="0" class="edit-form-item-long" ></InputNumber>
      </Form-item>
      <Form-item label="备注">
        <Input v-model="formValidate.note" class="edit-form-item-long" placeholder="请输入备注信息"/>
      </Form-item>
      <Form-item label="选择风控">
        <Select v-model="formValidate.riskControlCombinationId" :label-in-value=true  class="edit-form-item-long" filterable clearable >
          <Option v-for="item in riskControlData" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Form-item>
    </Form>
