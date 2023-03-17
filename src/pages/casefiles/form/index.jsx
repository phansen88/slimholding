/* eslint-disable prefer-destructuring */
import { useState } from 'react';

const axios = require('axios').default;

export default function Form() {
  const [inputs, setInputs] = useState({ language: 'da' });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function handleSubmit(event) {
    console.log(event);
    event.preventDefault();

    let caseFiles;
    const data = {
      title: inputs.title,
      language: inputs.language,
    };

    console.log(data);

    await axios
      .post('https://sandbox.penneo.com/api/v3/casefiles', data, {
        headers: {
          Authorization: 'WSSE profile="UsernameToken"',
          'X-WSSE':
            'UsernameToken Username="74a9b6f092a320a35f6a33f41ebd1c17fdd1d7ecd5a4abbbdab3b97a55376854", PasswordDigest="vG4FhU10N/GU4g+x+P65N06ehwI=", Nonce="e17b5a05616a63503446dce6d569afded84a1134a3712b0448496ad0cf21a0920c316f795de32b135b98f4cb6643244dd3b8f0d8cfadf7237f5b40758c291704", Created="2022-08-19T14:45:17+00:00"',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      // eslint-disable-next-line camelcase, no-return-assign
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  defaultValue={inputs.title || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <select
                  id="language"
                  name="language"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  defaultValue={inputs.language || ''}
                  onChange={handleChange}
                >
                  <option>en</option>
                  <option>da</option>
                  <option>sv</option>
                  <option>no</option>
                  <option>nl</option>
                  <option>fr</option>
                  <option>fi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
