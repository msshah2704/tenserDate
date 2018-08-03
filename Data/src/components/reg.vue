<template>
<div class="layout">
  <Layout>
    <Form ref="form" :model="form" :rules="ruleInline" inline >
      <FormItem prop="user">
        <input type="text" v-model.trim="form.user" placeholder="Username"/>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </FormItem>
      <br>
      <FormItem>
        <input type="number" v-model.trim="form.age" placeholder="age"/>
      </FormItem>
      <br>
      <FormItem>
      <input type="text" v-model.trim="form.phone" placeholder="Phone"/>
      </FormItem>
      <br>
      <FormItem>
      <input type="text" v-model.trim="form.desc" placeholder="Desc"/>
      </FormItem>
      <br>
      <FormItem>
        <input type="file" id="images" @change="uploadImage" accept="image/*" multiple>
        <!-- <img :src="imageData" class="preview" /> -->
        <!-- <Upload
            multiple
            action="//jsonplaceholder.typicode.com/posts/">
             <button v-on:click="addFiles()">Add Files</button>
        </Upload> -->
      </FormItem>
      <br>
      <FormItem>
          <Button @click.prevent="handleSubmit('form')">Submit</Button>
      </FormItem>
    </Form>
  </Layout>
</div>
</template>
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        user: '',
        age: '',
        phone: '',
        desc: '',
        images: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' },
          { type: 'string', min: 1, message: 'Please do not Blank user name', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please fill in the phone n0.', trigger: 'blur' },
          { type: 'number', min: 10, max:10, message: 'The age length cannot be less than 10 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      uploadImage: function (e) {
      const images = e.target.files[0]
      console.log(images);
      if (!images.type.includes('image/')) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader =new FileReader()
        reader.onload = (event) => {
        this.form.images = event.target.result
       console.log(this.form.images);
        // let i = this.images
        // return i
        // this.$refs.cropper.replace(this.images)
      //  this.$refs.cropper.replace(event.target.result)
      }
      reader.readAsDataURL(images)
      } else {
        alert('sorry File is not supported')
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          console.log(this.form)
          let url = 'http://localhost:3000/data'
          axios.post(url, this.form).then(res => {
            console.log('Success', res)
          }).catch(err => {
            console.log('Error', err)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
