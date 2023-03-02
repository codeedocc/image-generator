import { useState } from 'react'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'
import { download } from '../assets'
import { downloadImage } from '../utils'

const CreatePost = () => {
  const [generatingImg, setGeneratingImg] = useState(false)
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async (e) => {
    e.preventDefault()

    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json()

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Пожалуйста, задайте свойства.')
    }
  }

  return (
    <section className="max-w-2xl mx-auto">
      <form className="max-w-3xl" onSubmit={generateImage}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Свойства"
            type="text"
            name="prompt"
            placeholder="Teddy bears shopping for groceries in Japan, ukiyo-e"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 h-full flex justify-center items-center">
            {form.photo ? (
              <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain relative shadow-card hover:shadow-cardhover card rounded-xl"
                />
                <div className="group-hover:flex flex-col  hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
                  <div className="p-4 flex justify-between items-center gap-2">
                    <p className="text-white text-md overflow-y-auto prompt">
                      {form.prompt}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        downloadImage(
                          Math.floor(Math.random() * Date.now()),
                          form.photo
                        )
                      }
                      className="outline-none bg-transparent border-none"
                    >
                      <img
                        src={download}
                        alt="download"
                        className="w-6 h-6 object-contain invert"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5 justify-center">
          <button
            type="submit"
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {generatingImg ? 'Подождите...' : 'Создать'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
