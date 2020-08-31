const Template = require('../models/template')
const Response = require('../utils/response')

exports.template = async (ctx) => {
    // business logic 业务逻辑
    const temps = await Template.find({}).sort({
        update_at: -1
    })
    return Response.success(ctx, {
        code: 200,
        data: temps,
        message: 'success'
    })
}

exports.addTemplate = async (ctx) => {
    const result = await Template.create(ctx.request.body)
    return Response.success(ctx, {
        code: 200,
        data: result
    })
}

exports.template = async (ctx) => {
    const temp = await Template.findById({
        _id: ctx.params.id
    })
    if (temp) {
        return Response.success(ctx, {
            code: 200,
            data: temp
        })
    } else {
        return Response.fail(ctx)
    }
}

exports.putTemplate = async (ctx) => {
    const temp = await Template.findByIdAndUpdate({
            _id: ctx.params.id
        },
        ctx.request.body, {
            new: true
        }
    );
    if (temp) {
        return Response.success(ctx, {
            code: 200,
            data: temp
        });
    } else {
        return Response.fail(ctx);
    }
}

exports.delTemplate = async (ctx) => {
    try {
      await Template.findByIdAndRemove({ _id: ctx.params.id });
      return Response.ok(ctx, {
        code: 200,
        message: '删除成功'
      });
    } catch (e) {
      return Response.noContent(ctx);
    }
  };