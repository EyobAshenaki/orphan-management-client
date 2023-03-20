import { fileUploadInstance } from '~/helpers/axios.helper'

export const handleDocumentsUpload = async (files, dirName, docType) => {
  const documentObjects = []

  for (const file of files) {
    const formData = new FormData()

    if (file) {
      formData.append(dirName, file, file.name)
    }

    try {
      // upload the file to the server
      const response = await fileUploadInstance.post(dirName, formData)

      // data is the url that will be added to the database
      const { data } = response

      console.log('Document Url from server: ', data)

      documentObjects.push({
        documentType: docType,
        documentUrl: data,
      })
    } catch (error) {
      console.error(error)

      this.$toaster.showToast({
        content: 'Bad input! Try again.',
        state: 'error',
      })
      // throw new Error(error)
    }
  }

  return documentObjects
}

export const handleUrlUpload = async (file) => {
  const formData = new FormData()
  let dirName = ''

  if (isDocument(file)) {
    dirName = 'documents'
  } else if (isImage(file)) {
    dirName = 'images'
  }

  if (file) {
    formData.append(dirName, file, file.name)
  }

  try {
    // upload the file to the server
    const response = await fileUploadInstance.post(dirName, formData)

    console.log('Url from server: ', response.data)

    // data is the url that will be added to the database
    return response.data
  } catch (error) {
    console.error(error)

    this.$toaster.showToast({
      content: 'Bad input! Try again.',
      state: 'error',
    })
    // throw new Error(error)
  }
}

const isDocument = (file) => {
  return (
    !!file.type &&
    !!file.type.match(
      /^application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|application\/msword|application\/pdf$/
    )
  )
}

const isImage = (file) => {
  return !!file.type && !!file.type.match(/^image\/(png|jpeg|jpg|bmp|gif|svg)$/)
}
