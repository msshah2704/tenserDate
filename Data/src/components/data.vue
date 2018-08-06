<style>
body
{
margin-top: 250px;
background: url(1.jpg) no-repeat center fixed;
background-size: cover;
background-repeat: no-repeat;

}
.tbl {
background: -webkit-linear-gradient(top, #8286ee, #c46ee9,#8bc2d3,#e0f1f5);
border-width: 500px;
border-radius: 30px;
overflow: hidden;
padding: 55px 55px 37px 55px;
}
.btn
{
font-family: Poppins-Medium;
font-size: 20px;
color: #ffffff;
justify-content: center;
/* margin-left: 20%; */
padding: 12px 28px;
min-width: 120px;
height: 50px;
border-radius: 100px;
background: #9152f8;
/* width:35%; */
background: -webkit-linear-gradient(top, #c577f0 ,#6f73e0 ,#88d8ec);
background: -o-linear-gradient(top, #7579ff, #ba60e0);
background: -moz-linear-gradient(top, #7579ff, #b224ef);
background: linear-gradient(top, #7579ff, #b224ef);
position:right;
z-index: 1;
-webkit-transition: all 0.4s;
-o-transition: all 0.4s;
-moz-transition: all 0.4s;
transition: all 0.4s;
}
.btn1
{
font-family: Poppins-Medium;
font-size: 20px;
color: #ffffff;
justify-content: center;
padding: 12px 28px;
min-width: 120px;
height: 50px;
border-radius: 100px;
background: #9152f8;
/* width:30%; */
background: -webkit-linear-gradient(top, #c577f0 ,#6f73e0 ,#88d8ec );
background: -o-linear-gradient(top, #7579ff, #ba60e0);
background: -moz-linear-gradient(top, #7579ff, #b224ef);
background: linear-gradient(top, #7579ff, #b224ef);
position:right;
z-index: 1;
-webkit-transition: all 0.4s;
-o-transition: all 0.4s;
-moz-transition: all 0.4s;
transition: all 0.4s;
}
.btn:hover{box-shadow: 0 30px 30px 0 rgba(0,0,0,0.30), 0 17px 50px 0 rgba(0,0,0,0.19);}
.btn1:hover{box-shadow: 0 30px 30px 0 rgba(0,0,0,0.30), 0 17px 50px 0 rgba(0,0,0,0.19);}
.tbl:hover{box-shadow: 0 30px 30px 0 rgba(0,0,0,0.30), 0 17px 50px 0 rgba(0,0,0,0.19);}
</style>
<template>
<Form class="tbl" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width:50%; margin-left:20%; margin-top:5%">
     <FormItem>
      <Input type="hidden" v-model.trim="formValidate.id" />
     </FormItem>
    <FormItem label="Name" prop="name">
        <Input type="text" v-model.trim="formValidate.name" placeholder="Enter your name"/>
    </FormItem>
    <FormItem label="E-mail" prop="email">
        <Input type="text" v-model.trim="formValidate.email" placeholder="Enter your e-mail"/>
    </FormItem>
    <FormItem label="Mobile" prop="mobile">
        <Input type="text" v-model.trim="formValidate.mobile" placeholder="Enter your number" number/>
    </FormItem>
    <FormItem label="Address" prop="address">
        <Input type="text" v-model.trim="formValidate.address" placeholder="Enter your address"/>
    </FormItem>
    <FormItem label="Image" prop="images">
        <input type="file" id="images" @change="uploadImage" accept="image/*" multiple/>
    </FormItem>
    <FormItem>
        <Button class="btn" type="ghost" @click="onupdate()">Update</Button>
        <Button class="btn1" type="primary" @click="onSubmit('formValidate')">Submit</Button>
        <Button class="btn1" type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        <Button class="btn1" type="primary" @click="onView" style="margin-left: 8px">View</Button>
    </FormItem>
    <Table :columns="columns1" :data="res"></Table>
</Form>
</template>
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<script>
/* eslint-disable */
// eslint-disable-next-line
import axios from "axios";
import expandRow from './expandImages.vue'
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please fill mobile number"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          callback();
        }
      });
    };
    return {
      formValidate: {
        name: "",
        email: "",
        mobile: "",
        address: "",
        images: []
      },
      id: '',
      isShow: false,
      seen: true,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        mobile: [
          { validator: validateMobile, required: true, trigger: "blur",max: 10 }
        ],
        address: [
          {
            required: true,
            message: "Please enter a proper address",
            trigger: "blur"
          },
          {
            type: "string",
            max: 50,
            message: "Introduce no max than 50 words",
            trigger: "blur"
          }
        ]
      },
      labelPosition: "left",
      columns1: [
        {
          title: "Id",
          key: "id"
        },
        {
          title: "User",
          key: "name"
        },
        {
          title: "Email",
          key: "email"
        },
        {
          title: "mobile",
          key: "mobile"
        },
        {
          title: "address",
          key: "address"
        },
        {
          title: "Images",
          key: 'images',
            type: 'expand',
              render: (h, params) => {
                return h(expandRow, {
                    props: {
                        row: params.row
                    }
                })
            }
        },
        {
          title: 'Action',
          key: '',
          render: (h, params) => {
            let self = this;
            return h('div', [
              h('Button', {
                props: {
                  type: 'ghost'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                    this.res.splice(params.index,1)
                  }
                }
              } ,'Delete'),
              h('Button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              } , 'View'),
              h('Button', {
                props: {
                  type: 'ghost'
                },
                on: {
                  click () {
                    console.log(params.row.id)
                    console.log('Edit', params.row)
                    self.isShow = true
                    // self.isID = params.row.id
                    self.formValidate.id = params.row.id
                    self.formValidate.name = params.row.name
                    self.formValidate.email = params.row.email
                    self.formValidate.mobile = params.row.mobile
                    self.formValidate.address = params.row.address
                  }
                }
              } , 'Edit')
            ])
          }
        }
      ],
      res: []
    };
  },
  methods: {
    show (index) {
      this.$Modal.info({
        locale: 'en-US',
        title: 'User Infoormation',
        content: `id: ${this.res[index].id}<br>EMail: ${this.res[index].email}<br>Name: ${this.res[index].name}<br>Address: ${this.res[index].address}<br>Number: ${this.res[index].mobile}`
      })
    },
    uploadImage: function(e) {
      var images = [];
      for (let i = 0; i < 10; i++) {
        images = e.target.files[i];
        console.log(images);
        if (!images.type.includes("image/")) {
          alert("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          const reader = new FileReader();
          reader.onload = event => {
            this.formValidate.images.push(event.target.result);
            console.log(this.formValidate.images);
          };
          reader.readAsDataURL(images);
        } else {
          alert("sorry File is not supported");
        }
      }
    },
    remove (index) {
      var id = this.res[index].id
      console.log(id);
      axios.delete('http://localhost:3000/data/' + id)
    },
 onupdate () {
      var id = this.formValidate.id
      console.log(id)
          this.$Message.success("Success!")
          console.log("UPDATE",this.formValidate)
        axios.put('http://localhost:3000/data/' + id , this.formValidate)
          .then(res => {
           console.log("Success", res)
          })
         .catch(err => {
          console.log("Error", err)
       });
    },
  onSubmit(name) {
    let self = this
      self.$refs[name].validate(valid => {
        if (valid) {
          self.$Message.success("Success!");
          console.log(self.formValidate);
          let url = "http://localhost:3000/data";
          axios
            .post(url, self.formValidate)
            .then(res => {
              console.log("Success", res);
              location.reload();
              //  this.res = res.data
              // self.$refs['formValidate'].resetFields()
              // // this.$refs[images].resetFields()
            })
            .catch(err => {
              console.log("Error", err);
            });
        } else {
          self.$Message.error("Fail!");
        }
      });
      // self.$refs['formValidate'].resetFields()
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.isShow = false
    },
    onView() {
      //  var base64Img = require('base64-img');
      this.$Message.success("Success!");
       console.log(this.formValidate)
      let url = "http://localhost:3000/data";
      axios
        .get(url, this.formValidate)
        .then(res => {
          console.log("Success", res.data);
          this.res = res.data;
          console.log(this.res)
        })
        .catch(err => {
          console.log("Error", err);
        });
    }
  }
};
</script>
