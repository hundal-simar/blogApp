import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white border-t border-t-slate-700">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="mb-3 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[180px]">
                A home for writers and curious readers since 2026.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Company
            </h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link className="text-sm text-slate-400 hover:text-white transition-colors duration-200" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Support
            </h3>
            <ul className="space-y-3">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link className="text-sm text-slate-400 hover:text-white transition-colors duration-200" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Legals
            </h3>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link className="text-sm text-slate-400 hover:text-white transition-colors duration-200" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; Copyright 2026. All Rights Reserved by DevUI.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'RSS'].map((s) => (
              <Link key={s} to="/" className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200">
                {s}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Footer